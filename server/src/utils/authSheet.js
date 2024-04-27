const { APIKey } = require('../utils/mongoose/model');
const { decrypt } = require('./hash/hash');
const { JWT } = require('google-auth-library');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { sheetCache, apikeyCache } = require('./nodeCache');
const Joi = require('joi')

const getSheet = async (reqData, res) => {
    try {

        const str = `${reqData.apikey},${reqData.spreadSheetId},${reqData.sheetIndex}`
        
        var result = null
        if(apikeyCache.get(reqData.apikey)){
            result=apikeyCache.get(reqData.apikey)
        }else{
            result = await APIKey.findOne({ ApiKey: reqData.apikey })
            apikeyCache.set(reqData.apikey,result,1800)
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
        
        newSheet._rowCache=[]
        newSheet._spreadsheet._rawProperties={}
        newSheet.rows = rows

        const Dtype = sheetSchema(newSheet.headerValues,Joi)
        newSheet.headers = Dtype.heads
        newSheet.schema = Dtype.value
        newSheet.schemaKeys = newSheet.schema.describe().keys
        newSheet.schemaKeys._rowNumber = {type:'number'}

        sheetCache.set(str, newSheet, 1800)

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
const updateSheetIndex = (reqData,updatedsheet,row) => {
    const str = `${reqData.apikey},${reqData.spreadSheetId},${reqData.sheetIndex}`;
    updatedsheet.rows[row._rowNumber-1]= row
    sheetCache.set(str,updatedsheet)
}
const sheetSchema = (header,Joi) => {
    const result = {}
    const heads=[]
    var flag= 0
    const dType=['string','number','boolean','array','object']
    header.forEach(head => {
        if(head.includes(':')){
            const [key,value] = head.split(':')
            heads.push(key)
            if(dType.includes(value)){
                result[key] = switchType(dType[dType.indexOf(value)])
            } else {
                result[key] = Joi.string()
            }
        } else {
            heads.push('')
            flag+=1
        }
    })
    if(flag == 0){
        const value = Joi.object(result)
        return {value,heads}
    }else{
        console.log('please check your header it is missing data type `:<dataType>`')
    }
}
const switchType = (data)=>{
    switch(data){
        case 'string':
            return Joi.string()
        case 'number':
            return Joi.number()
        case 'boolean':
            return Joi.boolean()
        case 'array':
            return Joi.array().custom((value) => JSON.stringify(value))
        case 'object':
            return Joi.object().custom((value) => JSON.stringify(value))
        default:
            return Joi.string()
    }
}


module.exports = { getSheet, updateSheet, updateSheetIndex};
