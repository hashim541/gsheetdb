const { getSheet, updateSheet,updateSheetIndex} = require('../utils/authSheet')



const createOne = async (req, res) => {
    req.body.apikey = req.headers["apikey"];
    const reqData = req.body;
    const key = reqData.query.unique;
    const value = reqData.data[key];
    const sheet = await getSheet(reqData, res);
    const {  schema,schemaKeys, rows } = sheet;
  
    try {
        if(typeof reqData.data !== 'object' || Array.isArray(reqData.data)){
            throw new Error('data: must be an object')
        }
        if(key.length !== 0 && schemaKeys[key] === undefined){
            throw new Error(`${key} is not in header`)
        }
        if (sheet) {
            
            const result = checkType(reqData.data, schema,schemaKeys);
            if (!key) {
                const row =await sheet.addRow(result);
                updateSheetIndex(reqData,sheet,row)
            } else {
              const keyType =schemaKeys[key].type
                const row = rows.find(
                    (row) => row.get(`${key}:${keyType}`) === value
                );
                if (!row) {
                    const row = await sheet.addRow(result);
                    updateSheetIndex(reqData,sheet,row)
                } else {
                    return res.status(200).json(`Data already exists with ${value}`);
                }
            }
            res.status(200).json("Data created");
        }
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message.split("\n").join("") });
    }
};
  


  
const createMany = async (req, res) => {
    
    req.body.apikey = req.headers['apikey'];
    const reqData = req.body;
    const key = reqData.query.unique|| '';
    const sheet = await getSheet(reqData, res);
    let dataCreated = 0;
    let dataAlreadyExists = 0;
    const { _headerValues,schema, schemaKeys,rows } = sheet;

    try {
        if(!Array.isArray(reqData.data)){
            throw new Error('data: must be an array')
        }
        if(key.length !== 0 && schemaKeys[key] === undefined){
            throw new Error(`${key} is not in header`)
        }
        if (sheet) {
            if (key.length === 0) {

                const rowsToAdd = [];
                for (const eachData of reqData.data) {
                    const result = checkType(eachData, schema, schemaKeys);
                    rowsToAdd.push(result);
                    dataCreated++;
                }
                await sheet.addRows(rowsToAdd)
                await updateSheet(reqData, sheet);
            } else {
                const keyType = schemaKeys[key].type
                const rowsToAdd=[]
                const headerIndex = _headerValues.indexOf(`${key}:${keyType}`)
                const tempRows = rows.map(row => row._rawData[headerIndex]);
                for (const eachData of reqData.data) {
                    const value = eachData[key];
                    if(!tempRows.includes(value)){
                        const result = checkType(eachData, schema,schemaKeys)
                        tempRows.push(result[`${key}:${keyType}`])
                        rowsToAdd.push(result)
                        dataCreated++
                    }else{
                        dataAlreadyExists++
                    }
                }
                if(rowsToAdd.length !== 0){
                    await sheet.addRows(rowsToAdd)
                    await updateSheet(reqData, sheet);
                }
            }

            res.status(200).json(`Data created: ${dataCreated}, Data already exists: ${dataAlreadyExists}`);
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({error:error.message})
    }
};


const checkType = (data, schema, schemaKeys) => {
    const { error, value } = schema.validate(data)
  
    if (error) {
      throw new Error(error.details[0].message)
    }
  
    const resultData = {}
    for (const key in value) {
      const type = schemaKeys[key].type
      resultData[`${key}:${type}`] = value[key]
    }  
    return resultData
}
  
const converDataToArray = (eachData,schemaKeys) => {
    const result =[]
    for(let key in schemaKeys){
        if(eachData[key]){
            result.push(eachData[key])
        }else{
            result.push('')
        }
    }
    return result
}

  
module.exports = { createOne, createMany, checkType}