require('dotenv').config()

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const compression = require('compression')
const morgan = require('morgan')
const https = require('https');


const middleware = require('./utils/middleware')
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
app.use('/query',middleware,readRouts)
app.use('/query',middleware,createRouts)
app.use('/query',middleware,headerRouts)
app.use('/query',middleware,updateRoutes)
app.use('/query',middleware,deleteRoutes)
app.use('/query/aggregate/',middleware,aggregateRouts)

app.get('/',(req,res)=>{res.send('welcome to ( Google sheet ) as a database')})


app.listen(port,() => {
    console.log(`server running on port ${port}`)
})

const serverUrl = 'https://gsheetdb.onrender.com';

function pingServer() {
    https.get(serverUrl, (res) => {
        console.log(`Ping successful at ${new Date().toISOString()}`);
    }).on('error', (err) => {
        console.error(`Ping failed: ${err.message}`);
    });
}

const interval = setInterval(pingServer, 300000)
setTimeout(() => {
    clearInterval(interval)
    console.log('Pinging stopped after 1 hour')
}, 3600000)
