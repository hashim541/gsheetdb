const express = require('express')
const router = express.Router()

const { findOne } = require('../controllers/readData')

router.post('/findOne',findOne)

module.exports = router