const { getSheet, updateSheet} = require('../utils/authSheet')
const whereQuery = require('../utils/whereQuery')

const deleteOne = async(req, res) => {
    req.body.apikey = req.headers["apikey"];
    const reqData = req.body;
    const key = reqData.query.header || '';
    const value = reqData.query.value || '';
    const where = reqData.query.where || '==';
    const type = 'one'
    const sheet = await getSheet(reqData, res);
    try {
        if(sheet){
            const { schemaKeys,headers, rows } = sheet;
            const keyType =schemaKeys[key].type
            if(key.length == 0 || !headers.includes(key)){
                throw new Error(`${key} is not in header`)
            }

            const row = whereQuery( rows, key, keyType, value, where, type )
            if(row){
                await row.delete()
                updateSheet(reqData,sheet)
                return res.status(200).json('data deleted')
            }else{
                return res.status(200).json(`No data found with ${key} ${where} ${value}`);
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
    const where = reqData.query.where || '==';
    const type = 'many'
    const sheet = await getSheet(reqData, res);
    try {
        if(sheet){
            const { headers, schemaKeys, rows } = sheet;
            const keyType =schemaKeys[key].type
            if(key.length == 0 || !headers.includes(key)){
                throw new Error(`${key} is not in header`)
            }

            const row = whereQuery( rows, key, keyType, value, where, type )
            if(row.length == 0){
                return res.status(200).json(`No data found with ${key} ${where} ${value}`)
            }
            const rowsToUpdate=[]
            row.map((eachData,i)=>{
                rowsToUpdate.push(eachData.delete())
            })
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