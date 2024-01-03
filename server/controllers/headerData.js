const {getSheet,updateSheet} = require('../utils/authSheet')

const getHeader = async(req, res) => {

    const reqData = {
        apikey:req.headers['apikey'],
        spreadSheetId:req.body.spreadSheetId,
        sheetIndex:req.body.sheetIndex
    }

    const sheet = await getSheet(reqData, res)
    if(sheet){
        const headers = sheet.headerValues
        res.status(200).json(headers);
    }

}

const setHeader = async(req, res) => {
 
    const reqData = {
        apikey:req.headers['apikey'],
        spreadSheetId:req.body.spreadSheetId,
        sheetIndex:req.body.sheetIndex,
        sheetHeader:req.body.sheetHeader
    }
    const sheet =await getSheet(reqData, res)
    if(sheet){
        const headers = sheet.headerValues

        if(JSON.stringify(headers) !== JSON.stringify(reqData.sheetHeader)){
            await sheet.setHeaderRow(reqData.sheetHeader)
            updateSheet(reqData,sheet)
        }
        res.status(200).send(JSON.stringify(reqData.sheetHeader));
    }

}

module.exports = { getHeader, setHeader }