const express = require('express')
const router = express.Router()

const { getHeader, setHeader } = require('../controllers/headerData')

router.post('/getHeader',getHeader)
router.post('/setHeader',setHeader)

module.exports = router