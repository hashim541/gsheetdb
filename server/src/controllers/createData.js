const { getSheet, updateSheet} = require('../utils/authSheet')

const createOne = async(req, res) => {

    req.body.apikey=req.headers['apikey']
 
    const reqData = req.body

    const key = reqData.query.unique
    const value  = reqData.data[key]


    const sheet = await getSheet(reqData, res)

    if(sheet){
        if(!reqData.query.unique && reqData.query.unique.length === 0){
            await sheet.addRow(reqData.data)
        }else{
            const rows = sheet.rows
 
            const row = rows.find(row => row.get(key) === value)
            if(!row){
                await sheet.addRow(reqData.data)
                
            }else{
                return res.status(200).json(`data already exists with ${value}`)
            }
        }
        
        res.status(200).json('data created');
        await updateSheet(reqData,sheet)
    }
    

}
module.exports = { createOne }