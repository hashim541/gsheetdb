const express = require('express')
const router = express.Router()

const { getApiKey, toggleApikeyState, deleteApikey } = require('../controllers/apiKey')

router.post('/getapikey',getApiKey)
router.post('/toggleApikeyState',toggleApikeyState)
router.post('/deleteApikey',deleteApikey)

module.exports = router