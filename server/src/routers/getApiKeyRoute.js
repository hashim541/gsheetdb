const express = require('express')
const router = express.Router()

const { getApiKey } = require('../controllers/getApiKey')

router.post('/getapikey',getApiKey)

module.exports = router