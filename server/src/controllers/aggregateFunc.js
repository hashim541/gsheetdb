const { getSheet } = require('../utils/authSheet')


const count = async(req, res) => {
    req.body.apikey = req.headers['apikey'];

    const reqData = req.body;
    const key = reqData.query.header || '';

    const sheet = await getSheet(reqData, res);
    try {
        const { headers, schemaKeys,rows } = sheet;
        if(sheet){
            if(!headers.includes(key)){
                throw new Error(`${key} is not in header`)
            }
            const keyType = schemaKeys[key].type
            if( keyType !== 'number'){
                throw new Error(`${key} must be a type of number`)
            }
            const totalCount = rows.length
            res.status(200).json({count:totalCount})
        }   
    } catch (error) {
        console.log(error)
        res.status(400).json({error:error.message})
    }

}


const average = async(req, res) => {
    req.body.apikey = req.headers['apikey'];

    const reqData = req.body;
    const key = reqData.query.header || '';

    const sheet = await getSheet(reqData, res);

    try {
        const { headers, schemaKeys,rows } = sheet;
        if(sheet){
            if(!headers.includes(key)){
                throw new Error(`${key} is not in header`)
            }
            const keyType = schemaKeys[key].type
            if( keyType !== 'number'){
                throw new Error(`${key} is not a type of number`)
            }
            var sum = 0
            rows.map((row,i) =>{
                const getValue = row.get(`${key}:${keyType}`)
                const eachRowValue = getValue%1==0 ? getValue : 0
                sum += Number(eachRowValue)
            })
            console.log(sum)
            const totalCount = rows.length
            res.status(200).json({average:sum/totalCount})
        }   
    } catch (error) {
        console.log(error)
        res.status(400).json({error:error.message})
    }

}


const sum = async(req, res) => {
    req.body.apikey = req.headers['apikey'];

    const reqData = req.body;
    const key = reqData.query.header || '';

    const sheet = await getSheet(reqData, res);

    try {
        const { headers, schemaKeys,rows } = sheet;
        if(sheet){
            if(!headers.includes(key)){
                throw new Error(`${key} is not in header`)
            }
            const keyType = schemaKeys[key].type
            if( keyType !== 'number'){
                throw new Error(`${key} is not a type of number`)
            }
            var sum = 0
            rows.map((row,i) =>{
                const getValue = row.get(`${key}:${keyType}`)
                const eachRowValue = getValue%1==0 ? getValue : 0
                sum += Number(eachRowValue)
            })
            res.status(200).json({sum:sum})
        }   
    } catch (error) {
        console.log(error)
        res.status(400).json({error:error.message})
    }

}


const min = async(req, res) => {
    req.body.apikey = req.headers['apikey'];

    const reqData = req.body;
    const key = reqData.query.header || '';

    const sheet = await getSheet(reqData, res);

    try {
        const { headers, schemaKeys,rows } = sheet;
        if(sheet){
            if(!headers.includes(key)){
                throw new Error(`${key} is not in header`)
            }
            const keyType = schemaKeys[key].type
            if( keyType !== 'number'){
                throw new Error(`${key} is not a type of number`)
            }
            var min = Number(rows[0].get(`${key}:${keyType}`))%1 == 0 ? Number(rows[0].get(`${key}:${keyType}`)) : 0
            rows.map((row,i) =>{
                const getValue = row.get(`${key}:${keyType}`)
                const eachRowValue = getValue%1==0 ? getValue : 0
                if(min >= Number(eachRowValue)){
                    min=Number(eachRowValue)
                }
            })
            res.status(200).json({min:min})
        }   
    } catch (error) {
        console.log(error)
        res.status(400).json({error:error.message})
    }

}


const max = async(req, res) => {
    req.body.apikey = req.headers['apikey'];

    const reqData = req.body;
    const key = reqData.query.header || '';

    const sheet = await getSheet(reqData, res);

    try {
        const { headers, schemaKeys,rows } = sheet;
        if(sheet){
            if(!headers.includes(key)){
                throw new Error(`${key} is not in header`)
            }
            const keyType = schemaKeys[key].type
            if( keyType !== 'number'){
                throw new Error(`${key} is not a type of number`)
            }
            var max = Number(rows[0].get(`${key}:${keyType}`))%1 == 0 ? Number(rows[0].get(`${key}:${keyType}`)) : 0
            rows.map((row,i) =>{
                const getValue = row.get(`${key}:${keyType}`)
                const eachRowValue = getValue%1==0 ? getValue : 0
                if(max <= Number(eachRowValue)){
                    max=Number(eachRowValue)
                }
            })
            res.status(200).json({max:max})
        }   
    } catch (error) {
        console.log(error)
        res.status(400).json({error:error.message})
    }

}

module.exports = { count, average, sum, min, max }