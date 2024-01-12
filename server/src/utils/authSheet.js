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
        newSheet.rows = convertDataToColumn(rows,newSheet.headerValues)

        sheetCache.set(str, newSheet, 1800)
        return newSheet
    } catch (error) {
        console.error('getSheet error:', error.message)
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
const convertDataToColumn = (rows, header) => {
    const result = {}
    header.forEach((head) => {
        result[head] = []
    });
    rows.forEach((row) => {
        header.forEach((head, j) => {
            const cellValue = row._rawData[j] !== undefined ? row._rawData[j] : ""

            result[head].push(cellValue)
        });
    });
    return JSON.stringify(result)
}

module.exports = { getSheet, updateSheet};
