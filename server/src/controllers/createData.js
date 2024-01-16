const { getSheet, updateSheet} = require('../utils/authSheet')



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
                await sheet.addRow(result);
            } else {
              const keyType =schemaKeys[key].type
                const row = rows.find(
                    (row) => row.get(`${key}:${keyType}`) === value
                );
                if (!row) {
                    await sheet.addRow(result);
                } else {
                    return res.status(200).json(`Data already exists with ${value}`);
                }
            }
  
            res.status(200).json("Data created");
  
            await updateSheet(reqData, sheet);
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
    const {  schema, schemaKeys } = sheet;

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
                await sheet.addRows(rowsToAdd);
                await updateSheet(reqData, sheet);
            } else {
                const keyType = schemaKeys[key].type
                for (const eachData of reqData.data) {
                    const value = eachData[key];
                    const newSheet = await getSheet(reqData, res);
                    const rows = newSheet.rows;
                    const row = rows.find((row) => row.get(`${key}:${keyType}`) === value);

                    if (!row) {
                        const result = checkType(eachData, schema,schemaKeys);
                        await newSheet.addRow(result);
                        dataCreated++;
                        await updateSheet(reqData, newSheet);
                    } else {
                        dataAlreadyExists++;
                    }   
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
  


  
module.exports = { createOne, createMany }