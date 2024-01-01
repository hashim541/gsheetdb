const express = require('express')
const router = express.Router()

const { createOne } = require('../controllers/createData')

router.post('/createOne',createOne)

module.exports = router