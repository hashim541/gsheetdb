const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    userAPIKeys:Array,
    googleSheetsIds:Array
})

const User = mongoose.model('Users',userSchema)

const APIKeySchema = new mongoose.Schema({
    APIKey:String,
    googleServiceClientEmail:Object,
    googlePrivateKey:Object,
    active:Boolean
})

const APIKey = mongoose.model('ApiKeys',APIKeySchema)

module.exports = { User, APIKey }