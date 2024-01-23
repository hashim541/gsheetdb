const express = require('express')
const router = express.Router()

const { deleteOne, deleteMany } = require('../controllers/deleteData')

router.post('/deleteOne',deleteOne)
router.post('/deleteMany',deleteMany)

module.exports = router