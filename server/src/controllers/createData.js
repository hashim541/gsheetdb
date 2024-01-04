const { getSheet, updateSheet} = require('../utils/authSheet')



const createOne = async(req, res) => {

    req.body.apikey=req.headers['apikey']
    const reqData = req.body
    const key = reqData.query.unique
    const value  = reqData.data[key]
    const sheet = await getSheet(reqData, res)
    
    try {
        if (sheet) {
            if (!key) {
                await sheet.addRow(reqData.data);
            } else {
                const rows = sheet.rows;

                const row = rows.find((row) => row.get(key) === value);
                if (!row) {
                    await sheet.addRow(reqData.data);
                } else {
                    return res.status(200).json(`Data already exists with ${value}`);
                }
            }

            res.status(200).json('Data created');
            await updateSheet(reqData, sheet);
        }
    } catch (error) {
        console.log(error.message)
        res.status(400).json({error:error.message.split('\n').join('')})
    }


}
const createMany = async (req, res) => {
    try {
        req.body.apikey = req.headers['apikey'];

        const reqData = req.body;
        const key = reqData.query.unique;
        const sheet = await getSheet(reqData, res);
        let dataCreated = 0;
        let dataAlreadyExists = 0;

        if (sheet) {
            if (!key) {

                for (const eachData of reqData.data) {
                    await sheet.addRow(eachData);
                    dataCreated++;
                }
                await updateSheet(reqData, sheet);
            } else {

                for (const eachData of reqData.data) {
                    const value = eachData[key];
                    const newSheet = await getSheet(reqData, res);
                    const rows = newSheet.rows;
                    const row = rows.find((row) => row.get(key) === value);

                    if (!row) {
                        await newSheet.addRow(eachData);
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
        console.log(error.message)
        res.status(400).json({error:error.message.split('\n').join('')})
    }
};

module.exports = { createOne, createMany }