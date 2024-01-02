const express = require('express')
const router = express.Router()

const { findOne, findMany } = require('../controllers/readData')

router.post('/findOne',findOne)
router.post('/findMany',findMany)

module.exports = router