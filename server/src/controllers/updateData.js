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
const updateMany = () => {
    console.log('update Many')
}

module.exports = {updateOne,updateMany}