const { getSheet, updateSheet, updateSheetIndex} = require('../utils/authSheet')
const {checkType} = require('./createData')


const updateOne = async(req, res) => {
    req.body.apikey = req.headers["apikey"];
    const reqData = req.body;
    const key = reqData.query.header || '';
    const value = reqData.query.value || '';
    const sheet = await getSheet(reqData, res);
    try {
        if(typeof reqData.data !== 'object'){
            throw new Error('data: must be an object')
        }
        if(sheet){
            const { schema, headers, schemaKeys, rows } = sheet;
            const keyType =schemaKeys[key].type
            if(key.length == 0 || !headers.includes(key)){
                throw new Error(`${key} is not in header`)
            }

            const row = rows.find((row) => row.get(`${key}:${keyType}`) == value)
            if(row){
                const result = checkType(reqData.data, schema, schemaKeys)
                row.assign(result)
                await row.save()
                updateSheetIndex(reqData,sheet,row)
                return res.status(200).json('data updated')
            }else{
                return res.status(404).json(null);
            }
        }
    } catch (error) {
        console.log(error.message)
        res.status(400).json({error:error.message})
    }
}



const updateMany = async(req, res) => {
    req.body.apikey = req.headers["apikey"];
    const reqData = req.body;
    const key = reqData.query.header || '';
    const value = reqData.query.value || '';
    const sheet = await getSheet(reqData, res);
    try {
        if(typeof reqData.data !== 'object'){
            throw new Error('data: must be an object')
        }
        if(sheet){
            const { schema, headers, schemaKeys, rows } = sheet;
            const keyType =schemaKeys[key].type
            if(key.length == 0 || !headers.includes(key)){
                throw new Error(`${key} is not in header`)
            }

            const row = rows.filter((row) => row.get(`${key}:${keyType}`) == value)
            if(row.length <= 0){
                res.status(400).json(`couldn't find data with ${key} == ${value}`)
            }
            const result = checkType(reqData.data, schema, schemaKeys)
            const rowsToUpdate=[]
            row.map((eachData,i)=>{
                eachData.assign(result)
                rowsToUpdate.push(eachData.save())
                updateSheetIndex(reqData,sheet,row)
            })
            rowsToUpdate.reverse()
            await Promise.all(rowsToUpdate)
            res.status(200).json('data updated successfully')
        }
    } catch (error) {
        console.log(error.message)
        res.status(400).json({error:error.message})
    }
}




module.exports = {updateOne,updateMany}