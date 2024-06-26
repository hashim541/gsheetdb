const {getSheet} = require('../utils/authSheet')
const {formatData} = require('../utils/formatData')
const whereQuery = require('../utils/whereQuery')
const sortMethod = require('../utils/sort')

const findOne = async (req, res) => {
    try {
        req.body.apikey = req.headers['apikey'];
        req.body.query.return = req.body.query.return || [];

        const reqData = req.body;
        const key = reqData.query.header || '';
        const value = reqData.query.value || '';
        const where = reqData.query.where || '==';
        const type = 'one'

        const sheet = await getSheet(reqData, res);

        if (sheet) {
            const { headers, schemaKeys, rows } = sheet;
            const keyType =schemaKeys[key].type
            if (headers.includes(key)) {
                const row = whereQuery( rows, key, keyType, value, where, type )

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
        res.status(500).json({ error: error.message });
    }
};


const findMany = async(req, res) => {
    try{
        req.body.apikey=req.headers['apikey']
        req.body.query.return = req.body.query.return || []
        const reqData = req.body
        
        const key = reqData.query.header || ''
        const value = reqData.query.value || ''
        const where = reqData.query.where || '==';
        const type = 'many'
        const sort = reqData.query.sort || '_rowNumber:asc'

        const sheet = await getSheet(reqData, res)
        if(sheet){

            const { headers, schemaKeys, rows } = sheet;
            if(headers.includes(key)){
                const keyType =schemaKeys[key].type 
                const result = whereQuery( rows, key, keyType, value, where, type )
                    .map((row) => formatData(row, headers, schemaKeys, reqData.query.return))

                const finalResult = sortMethod(sort,result,schemaKeys)
                res.status(200).json(finalResult)
            }else{
                return res.status(400).json({ error: `${key} doesn't exist in header` });
            }
        }
    }catch (error) {
        console.error('Error in findMany:', error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = { findOne, findMany }