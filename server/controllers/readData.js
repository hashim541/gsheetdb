const {getSheet,updateSheet} = require('../utils/authSheet')

const findOne = async(req, res) => {
    console.time('findOne')
    const reqData = {
        apikey:req.headers['apikey'],
        spreadSheetId:req.body.spreadSheetId,
        sheetIndex:req.body.sheetIndex,
        query:req.body.query
    }
    
    const key = Object.keys(reqData.query)[0]
    const value = reqData.query[key]

    const sheet = await getSheet(reqData, res)
    if(sheet){

        const headers = sheet.headerValues
        
        const rows = await sheet.getRows()
        const row = rows.find(row => row.get(key) === value);
        if (row) {
            const result = headers.reduce((acc, head, j) => {
                acc[head] = row._rawData[j];
                return acc;
            }, {});
        
            res.status(200).json(result);
        } else {
            res.status(404).json(null);
        }
    }
    
    console.timeEnd('findOne')
}

module.exports = { findOne }