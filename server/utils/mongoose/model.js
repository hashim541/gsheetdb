const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    APIKey:Array,
    googleSheetsId:Array
})

const User = mongoose.model('Users',userSchema)

const APIKeySchema = new mongoose.Schema({
    APIKey:String,
    googleServiceClientEmail:String,
    googlePrivateKey:String,
})

const APIKey = mongoose.model('ApiKeys',APIKeySchema)

module.exports = { User, APIKey }