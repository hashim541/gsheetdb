const express = require('express')
const router = express.Router()

const { find } = require('../controllers/readData')

router.post('/find',find)

module.exports = router