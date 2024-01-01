const { APIKey } = require('../utils/mongoose/model');
const { decrypt } = require('./hash/hash');
const { JWT } = require('google-auth-library');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const sheetCache = require('./nodeCache');

const getSheet = async (reqData, res) => {
    try {

        if(reqData.apikey === undefined){
            return res.status(400).json({error:'Please provide an apikey in the headers'})
        }
        if(reqData.spreadSheetId === undefined){
            return res.status(400).json({error:'Please provide an spread sheet id'})
        }
        if(reqData.sheetIndex === undefined){
            return res.status(400).json({error:'Please provide an sheet index'})
        }

        const str = `${reqData.apikey},${reqData.spreadSheetId},${reqData.sheetIndex}`
        const result = await APIKey.findOne({ ApiKey: reqData.apikey })

        if (!result) {
            throw new Error('Error finding apikey')
        }

        if (!result.active) {
            throw new Error('Your apikey is disabled')
        }

        const sheet = sheetCache.get(str)

        if (sheet) {
            console.log('')
            console.log('Sheet cache hit')

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
        await newSheet.loadHeaderRow()

        if (!newSheet) {
            throw new Error('Sheet not found')
        }
        await newSheet.getRows()
        console.log('')
        console.log('New sheet cache')
        

        sheetCache.set(str, newSheet, 1800)
        return newSheet
    } catch (error) {
        console.error('getSheet error:', error.message)
        res.status(500).json({ error: error.message })
    }
};

const updateSheet = (reqData, updatedsheet) => {
    const str = `${reqData.apikey},${reqData.spreadSheetId},${reqData.sheetIndex}`;
    sheetCache.set(str, updatedsheet,1800)
    console.log('sheet updated')
}


module.exports = { getSheet, updateSheet};
