const {getSheet} = require('../utils/authSheet')
const formatData = require('../utils/formatData')

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
            const result = formatData(row, headers)
        
            res.status(200).json(result);
        } else {
            res.status(404).json(null);
        }
    }
    
    console.timeEnd('findOne')
}

const findMany = async(req, res) => {
    console.time('findMany')
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
        const filteredRow = rows.filter(row => {
            if(row.get(key) == value){
                return row
            }
        })

        const result = []
        filteredRow.map(row => {
            
            const filteredData = formatData(row, headers)
            result.push(filteredData)
        })
        res.status(200).json(result);
    }
    console.timeEnd('findMany')
}

module.exports = { findOne, findMany }