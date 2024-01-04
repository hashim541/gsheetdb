const { getSheet, updateSheet} = require('../utils/authSheet')

const createOne = async(req, res) => {

    req.body.apikey=req.headers['apikey']
 
    const reqData = req.body

    const key = reqData.query.unique
    const value  = reqData.data[key]


    const sheet = await getSheet(reqData, res)

    if(sheet){
        if(!reqData.query.unique && reqData.query.unique.length === 0){
            await sheet.addRow(reqData.data)
        }else{
            const rows = sheet.rows
 
            const row = rows.find(row => row.get(key) === value)
            if(!row){
                await sheet.addRow(reqData.data)
                
            }else{
                return res.status(200).json(`data already exists with ${value}`)
            }
        }
        
        res.status(200).json('data created');
        await updateSheet(reqData,sheet)
    }
    

}
const createMany = async(req, res) => {
    req.body.apikey=req.headers['apikey']
 
    const reqData = req.body

    const key = reqData.query.unique

    const sheet = await getSheet(reqData, res)
    var dataCreated = 0
    var dataAlreadyExists = 0
    if(sheet){
        if(!reqData.query.unique && reqData.query.unique.length === 0){
            console.log(reqData.data)
            reqData.data.map(async(EachData, i)=>{
                await sheet.addRow(EachData)
                dataCreated++
            })
            await updateSheet(reqData,sheet)
        }else{
            console.log('else')
            reqData.data.map(async(EachData, i)=>{
                const value  = EachData[key]
                const newSheet = await getSheet(reqData, res)
                const rows = newSheet.rows
                const row = rows.find(row => row.get(key) === value)
                if(!row){
                    await newSheet.addRow(EachData)
                    dataCreated++
                    
                }else{
                    dataAlreadyExists++
                }
               await updateSheet(reqData,newSheet)

            })
        }
        res.status(200).json(`data created ${dataCreated}, data already exists ${dataAlreadyExists}`)
    }
    console.log('completed')
}
module.exports = { createOne, createMany }