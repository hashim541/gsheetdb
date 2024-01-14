const { getSheet, updateSheet} = require('../utils/authSheet')



const createOne = async (req, res) => {
    req.body.apikey = req.headers["apikey"];
    const reqData = req.body;
    const key = reqData.query.unique;
    const value = reqData.data[key];
    const sheet = await getSheet(reqData, res);
    const {  dataType, rows } = sheet;
  
    try {
        if (sheet) {
            const result = checkType(reqData.data, dataType);
            if (!key) {
                await sheet.addRow(result);
            } else {
                const row = rows.find(
                    (row) => row.get(`${key}:${dataType[key]}`) === value
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
    const key = reqData.query.unique;
    const sheet = await getSheet(reqData, res);
    let dataCreated = 0;
    let dataAlreadyExists = 0;
    const { dataType } = sheet;
    
    try {
        if (sheet) {
            if (!key) {

                for (const eachData of reqData.data) {
                    const result = checkType(eachData, dataType);
                    await sheet.addRow(result);
                    dataCreated++;
                }
                await updateSheet(reqData, sheet);
            } else {
                reqData.data.map(data => checkType(data,dataType))
                for (const eachData of reqData.data) {
                    const value = eachData[key];
                    const newSheet = await getSheet(reqData, res);
                    const rows = newSheet.rows;
                    const row = rows.find((row) => row.get(`${key}:${dataType[key]}`) === value);

                    if (!row) {
                        const result = checkType(eachData, dataType);
                        await newSheet.addRow(result);
                        dataCreated++;
                    } else {
                        dataAlreadyExists++;
                    }
                    await updateSheet(reqData, newSheet);
                }
            }

            res.status(200).json(`Data created: ${dataCreated}, Data already exists: ${dataAlreadyExists}`);
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({error:error.message})
    }
};


const checkType = (data, dataType) => {
    const result = {};
    for (const [key, value] of Object.entries(data)) {
      if (dataType[key]) {
        const type = whatType(value);
        if (dataType[key] !== type) {
          throw new Error(`${key}:${data[key]} is a ${dataType[key]} type`);
        } else {
          result[`${key}:${type}`] = type === "arr" || type === "obj" ? JSON.stringify(value) : value;
        }
      }
    }
    return result;
};
  

const whatType = (data) => {
    if (typeof data === "number") {
      return "num";
    } else if (typeof data === "boolean") {
      return "bool";
    } else if (Array.isArray(data)) {
      return "arr";
    } else if (typeof data === "object") {
      return "obj";
    } else {
      return "str";
    }
  };
  
module.exports = { createOne, createMany }