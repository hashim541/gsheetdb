const {getSheet} = require('../utils/authSheet')
const formatData = require('../utils/formatData')

const findOne = async(req, res) => {
    req.body.apikey=req.headers['apikey']
    req.body.query.return = req.body.query.return || []
    const reqData = req.body
    
    const key = reqData.query.header
    const value = reqData.query.value

    const sheet = await getSheet(reqData, res)
    if(sheet){

        const headers = sheet.headerValues
        
        // const rows = sheet.rows
        var rows = JSON.parse(sheet.rows)
 
        // const row = rows.find(row => row.get(key) === value);
        const index = rows[key].indexOf(value)
        
        if (index) {
            const result = formatData(rows,index, headers,reqData.query.return)
            rows=''
            res.status(200).json(result);
        } else {
            res.status(404).json(null);
        }
    }

    
}

const findMany = async(req, res) => {

    req.body.apikey=req.headers['apikey']
    req.body.query.return = req.body.query.return || []
    const reqData = req.body
    
    const key = reqData.query.header
    const value = reqData.query.value
    const sheet = await getSheet(reqData, res)
    if(sheet){
        // console.log(sheet.testRows)
        const headers = sheet.headerValues
        const rows = sheet.rows
        const result = rows
            .filter((row) => row.get(key) == value)
            .map((row) => formatData(row, headers,reqData.query.return))


        res.status(200).json(result)
    }

    // console.log(process.memoryUsage())
}

module.exports = { findOne, findMany }