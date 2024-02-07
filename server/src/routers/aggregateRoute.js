const express = require('express')
const router = express.Router()

const { count, average, sum, min, max } = require('../controllers/aggregateFunc')

router.post('/count',count)
router.post('/average',average)
router.post('/sum',sum)
router.post('/min',min)
router.post('/max',max)

module.exports = router