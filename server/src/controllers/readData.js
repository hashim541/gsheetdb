const {getSheet} = require('../utils/authSheet')
const {formatData} = require('../utils/formatData')

const findOne = async (req, res) => {
    try {
        req.body.apikey = req.headers['apikey'];
        req.body.query.return = req.body.query.return || [];

        const reqData = req.body;
        const key = reqData.query.header || '';
        const value = reqData.query.value || '';

        const sheet = await getSheet(reqData, res);

        if (sheet) {
            const { headers, schemaKeys, rows } = sheet;
            const keyType =schemaKeys[key].type
            if (headers.includes(key)) {

                const row = rows.find((row) => row.get(`${key}:${keyType}`) == value);

                if (row) {
                    const result = formatData(row, headers, schemaKeys, reqData.query.return);
                    return res.status(200).json(result);
                }

                return res.status(404).json(null);
            }

            return res.status(400).json({ error: `${key} doesn't exist in header` });
        }
    } catch (error) {
        console.error('Error in findOne:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const findMany = async(req, res) => {

    req.body.apikey=req.headers['apikey']
    req.body.query.return = req.body.query.return || []
    const reqData = req.body
    
    const key = reqData.query.header || ''
    const value = reqData.query.value 
    const sheet = await getSheet(reqData, res)
    if(sheet){

        const { headers, schemaKeys, rows } = sheet;
        if(headers.includes(key)){
            const keyType =schemaKeys[key].type 
            const result = rows
                .filter((row) => row.get(`${key}:${keyType}`) == value)
                .map((row) => formatData(row, headers, schemaKeys, reqData.query.return))


            res.status(200).json(result)
        }else{
            return res.status(400).json({ error: `${key} doesn't exist in header` });
        }
    }
}

module.exports = { findOne, findMany }