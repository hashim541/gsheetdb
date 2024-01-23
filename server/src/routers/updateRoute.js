const express = require('express')
const router = express.Router()

const { updateOne, updateMany } = require('../controllers/updateData')

router.post('/updateOne',updateOne)
router.post('/updateMany',updateMany)

module.exports = router