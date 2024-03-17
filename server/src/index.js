const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const compression = require('compression')
const morgan = require('morgan')

// const socket  = require('./socketClient')

const registerRouts = require('./routers/registerRoute')
const apiKeyRouts = require('./routers/apiKeyRoute')
const loginRouts = require('./routers/loginRoute')
const readRouts = require('./routers/readRoute')
const createRouts = require('./routers/createRoute')
const updateRoutes = require('./routers/updateRoute')
const deleteRoutes = require('./routers/deleteRoute')
const headerRouts = require('./routers/headerRoute')
const aggregateRouts = require('./routers/aggregateRoute')

const app = express()
const port = 3000
const DB_Username = 'hashim00541x'
const DB_Password = 'P72vzkRm2cd7XxMd'
const DataBase = 'googleSheet'
const mongodbURI=`mongodb+srv://${DB_Username}:${DB_Password}@sheet.bz4evue.mongodb.net/${DataBase}?retryWrites=true&w=majority`
const localURI=`mongodb://127.0.0.1:27017/holySheet`

app.use(compression({ threshold: '1b' }))

app.use(cors())
app.use(morgan('tiny'))
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
app.use('/user',apiKeyRouts)
app.use('/query',readRouts)
app.use('/query',createRouts)
app.use('/query',headerRouts)
app.use('/query',updateRoutes)
app.use('/query',deleteRoutes)
app.use('/query/aggregate/',aggregateRouts)

app.get('/',(req,res)=>{res.send('welcome to ( Google sheet ) as a database')})


app.listen(port,() => {
    console.log(`server running on port ${port}`)
})

// function printMemoryUsage() {
//   const memoryUsage = process.memoryUsage();
//   const usedMB = Math.round(memoryUsage.rss / 1024 / 1024);
//   const heapUsedMB = Math.round(memoryUsage.heapUsed / 1024 / 1024);
  
//   console.log(`Memory Usage: ${usedMB} MB`);
//   console.log(`Heap Used: ${heapUsedMB} MB`);
// }

// setInterval(printMemoryUsage, 60 * 1000);
