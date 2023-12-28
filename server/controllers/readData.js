const authSheet = require('../utils/authSheet')

const find = async(req, res) => {
    
    const reqData = {
        apikey:req.headers['apikey'],
        spreadSheetId:req.body.spreadSheetId,
        sheetIndex:req.body.sheetIndex,
        query:req.body.query
    }
    const doc = await authSheet(reqData,res);
    if(doc){
        const sheet = doc.sheetsByIndex[reqData.sheetIndex]
        if (!sheet) {
            return res.status(404).json({ error: 'Sheet not found' });
        }
        await sheet.loadHeaderRow()
        const header = sheet.headerValues
        const rows = await sheet.getRows()
        var key,value;
        for(const keys in reqData.query) {
            key = keys
            value = reqData.query[keys]
            break;
        }
        const result = {}
        for(let i=0; i<rows.length; i++){
            if(rows[i].get(key)===value){
                header.map((head,j) => {
                    result[head] = rows[i]._rawData[j]
                })
                break
            }
        }
        
        res.status(200).json({data:result})
    }
}

module.exports = { find }