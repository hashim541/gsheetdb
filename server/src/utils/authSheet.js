const { APIKey } = require('../utils/mongoose/model');
const { decrypt } = require('./hash/hash');
const { JWT } = require('google-auth-library');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { sheetCache, apikeyCache } = require('./nodeCache');

const getSheet = async (reqData, res) => {
    try {

        if(reqData.apikey === undefined){
            throw new Error('Please provide an apikey in the headers')
        }
        if(reqData.spreadSheetId === undefined){
            throw new Error('Please provide an spread sheet id')
        }
        if(reqData.sheetIndex === undefined){
            throw new Error('Please provide an sheet index')
        }

        const str = `${reqData.apikey},${reqData.spreadSheetId},${reqData.sheetIndex}`
        
        var result = null
        if(apikeyCache.get(reqData.apikey)){
            result=apikeyCache.get(reqData.apikey)
        }else{
            result = await APIKey.findOne({ ApiKey: reqData.apikey })
            apikeyCache.set(reqData.apikey,result,300)
        }
        if (!result) {
            throw new Error('Error finding apikey')
        }

        if (!result.active) {
            throw new Error('Your apikey is disabled')
        }

        const sheet = sheetCache.get(str)

        if (sheet) {
            return sheet
        }

        const clientEmail = decrypt(result.googleServiceClientEmail)
        const privateKey = decrypt(result.googlePrivateKey)

        const jwtClient = new JWT({
            email: clientEmail,
            key: privateKey,
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        })

        await jwtClient.authorize()


        const doc = new GoogleSpreadsheet(reqData.spreadSheetId, jwtClient)
        await doc.loadInfo()

        const newSheet = doc.sheetsByIndex[reqData.sheetIndex]

        if (!newSheet) {
            throw new Error('Sheet not found')
        }
        const [headers,rows] = await Promise.all([
            newSheet.loadHeaderRow(),
            newSheet.getRows(),
        ]);
        newSheet.rows = rows
        const Dtype = addType(newSheet.headerValues)
        newSheet.headers = Dtype.heads
        newSheet.dataType = Dtype.result

        sheetCache.set(str, newSheet, 1800)
        // invertedSheetCache.set(reqData.spreadSheetId,buildInvertedIndex(rows,newSheet.headerValues),1800)

        return newSheet
    } catch (error) {
        console.error('getSheet error:', error)
        res.status(400).json({ error: error.message })
    }
};

const updateSheet = async(reqData, updatedsheet) => {
    const str = `${reqData.apikey},${reqData.spreadSheetId},${reqData.sheetIndex}`;
    const rows = await updatedsheet.getRows()
    updatedsheet.rows = rows
    sheetCache.set(str, updatedsheet)
    
    console.log('sheet updated')
}
const addType = (header) => {
    const result = {}
    const heads=[]
    var flag= 0
    const dType=['str','num','bool','date','arr','obj']
    header.forEach(head => {
        if(head.includes(':')){
            const [key,value] = head.split(':')
            heads.push(key)
            if(dType.includes(value)){
                result[key] = value
            } else {
                result[key] = 'str'
            }
        } else {
            flag+=1
        }
    })
    if(flag == 0){
        return {result,heads}
    }else{
        console.log('please check your header it is missing data type `:<dataType>`')
    }
}
// function buildInvertedIndex(rows,headers) {
//     const invertedIndex = new Map();
//     rows.forEach((row, rowIndex) => {
//       row._rawData.forEach((value, i) => {
//         if (!invertedIndex.has(headers[i]+value)) {
//           invertedIndex.set(headers[i]+value, [rowIndex]);
//         } else {
//           invertedIndex.get(headers[i]+value).push(rowIndex);
//         }
//       });
//     });
//     return invertedIndex
//   }
// const convertDataToColumn = (rows, header) => {
//     const result = {}
//     header.forEach((head) => {
//         result[head] = []
//     });
//     rows.forEach((row) => {
//         header.forEach((head, j) => {
//             const cellValue = row._rawData[j] !== undefined ? row._rawData[j] : ""

//             result[head].push(cellValue)
//         });
//     });
//     return JSON.stringify(result)
// }

module.exports = { getSheet, updateSheet};
