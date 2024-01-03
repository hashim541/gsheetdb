const { getSheet, updateSheet} = require('../utils/authSheet')

const createOne = async(req, res) => {

    const reqData ={
        apikey:req.headers['apikey'],
        spreadSheetId:req.body.spreadSheetId,
        sheetIndex:req.body.sheetIndex,
        data:req.body.data
    }

    const sheet = await getSheet(reqData, res)

    if(sheet){

        await sheet.addRow(reqData.data)
        updateSheet(reqData,sheet)
        res.status(200).json('data created');
    }
    

}
module.exports = { createOne }