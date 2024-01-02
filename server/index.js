const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const compression = require('compression')

const registerRouts = require('./routers/registerRoute')
const getApiKeyRouts = require('./routers/getApiKeyRoute')
const loginRouts = require('./routers/loginRoute')
const readRouts = require('./routers/readRoute')
const createRouts = require('./routers/createRoute')
const headerRouts = require('./routers/headerRoute')

const app = express()
const port = 3000
const DB_Username = 'hashim00541x'
const DB_Password = 'P72vzkRm2cd7XxMd'
const DataBase = 'googleSheet'
const mongodbURI=`mongodb+srv://${DB_Username}:${DB_Password}@sheet.bz4evue.mongodb.net/${DataBase}?retryWrites=true&w=majority`
const localURI=`mongodb://127.0.0.1:27017/holySheet`

// app.use(compression({ threshold: '1b' }))

app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());

// {
//   origin: ["https://upgraded-train-wpjgg9jw64r25gjw-5173.app.github.dev",'http://localhost:5173']
// }
// 1xymyqdZ_1S5Nts6pe_dwe6PfHUXBIJsZFEepzHA4agI
// 11V0iILqRDt-K0NX6TH74YKGsE12-P-a-q-xQfTRGw2g

mongoose.connect(mongodbURI)
.then(() => {
  console.log('Connected to Database')
})
.catch((err) => {
  console.log('Error connecting to Database :',err)
})


app.use('/user',loginRouts)
app.use('/user',registerRouts)
app.use('/user',getApiKeyRouts)
app.use('/query',readRouts)
app.use('/query',createRouts)
app.use('/query',headerRouts)


app.listen(port,() => {
    console.log(`server running on port ${port}`)
})


