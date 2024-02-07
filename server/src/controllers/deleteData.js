const { getSheet, updateSheet, updateSheetIndex} = require('../utils/authSheet')

const deleteOne = async(req, res) => {
    req.body.apikey = req.headers["apikey"];
    const reqData = req.body;
    const key = reqData.query.header || '';
    const value = reqData.query.value || '';
    const sheet = await getSheet(reqData, res);
    try {
        if(sheet){
            const { schemaKeys,headers, rows } = sheet;
            const keyType =schemaKeys[key].type
            if(key.length == 0 || !headers.includes(key)){
                throw new Error(`${key} is not in header`)
            }

            const row = rows.find((row) => row.get(`${key}:${keyType}`) == value)
            if(row){
                await row.delete()
                updateSheet(reqData,sheet)
                return res.status(200).json('data deleted')
            }else{
                return res.status(404).json(null);
            }
        }
    } catch (error) {
        console.log(error.message)
        res.status(400).json({error:error.message})
    }
}
const deleteMany = async(req, res) => {
    req.body.apikey = req.headers["apikey"];
    const reqData = req.body;
    const key = reqData.query.header || '';
    const value = reqData.query.value || '';
    const sheet = await getSheet(reqData, res);
    try {
        if(sheet){
            const { headers, schemaKeys, rows } = sheet;
            const keyType =schemaKeys[key].type
            if(key.length == 0 || !headers.includes(key)){
                throw new Error(`${key} is not in header`)
            }

            const row = rows.filter((row) => row.get(`${key}:${keyType}`) == value)
            if(row.length <= 0){
                throw new Error(`couldn't find data with ${key} == ${value}`)
            }
            const rowsToUpdate=[]
            row.map((eachData,i)=>{
                rowsToUpdate.push(eachData.delete())
            })
            console.log(row.length,rowsToUpdate.length)
            await Promise.all(rowsToUpdate)
            updateSheet(reqData,sheet)
            return res.status(200).json('data deleted')
        }
    } catch (error) {
        console.log(error.message)
        res.status(400).json({error:error.message})
    }
}

module.exports = {deleteOne,deleteMany}