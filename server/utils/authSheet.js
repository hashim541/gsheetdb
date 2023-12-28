const { APIKey } = require('../utils/mongoose/model')
const { decrypt } = require('./hash/hash')
const { JWT } = require('google-auth-library')
const { GoogleSpreadsheet } = require('google-spreadsheet')

const authSheet = async(reqData, res) => {
    var doc
    var flag = true
    if(reqData.apikey === undefined){
        return res.status(400).json({error:'Please provide an apikey in the headers'})
    }
    if(reqData.spreadSheetId === undefined){
        return res.status(400).json({error:'Please provide an spread sheet id'})
    }
    if(reqData.sheetIndex === undefined){
        return res.status(400).json({error:'Please provide an sheet index'})
    }

    await APIKey.findOne({
        ApiKey:reqData.apikey
    })
    .then(async(result) => {
        if(result === null){
            return res.status(400).json({error:'could not find apikey. please check your apikey.'})
        }
        if(result.active === false){
            return res.status(400).json({error:'your apikey is disabled'})
        }
        const clientEmail = decrypt(result.googleServiceClientEmail)
        const privateKey = decrypt(result.googlePrivateKey)

        const jwtClient = new JWT({
            email:clientEmail,
            key:privateKey,
            scopes:[
                'https://www.googleapis.com/auth/spreadsheets'
            ]
        })

        try {
            await jwtClient.authorize();
            doc = new GoogleSpreadsheet(reqData.spreadSheetId,jwtClient)
            await doc.loadInfo()
                       
        } catch (error) {
            flag = false
            console.log(error.message)
            return res.status(400).json({error: error.message}) // Improved error message
        }
    })
    .catch((error) => {
        console.log(error) // Log the error for debugging
        return res.status(400).json({error:'Error finding apikey'})
    })
    if(flag){
        return doc
    }
}

module.exports = authSheet