require('dotenv').config()

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const compression = require('compression')
const morgan = require('morgan')


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
const mongodbURI=process.env.CONNECTION_URL

app.use(compression({ threshold: '1b' }))

app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());


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
