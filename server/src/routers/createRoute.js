const express = require('express')
const router = express.Router()

const { createOne, createMany } = require('../controllers/createData')

router.post('/createOne',createOne)
router.post('/createMany',createMany)

module.exports = router