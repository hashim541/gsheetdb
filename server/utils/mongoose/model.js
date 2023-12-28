const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    userApiKeys:Array,
    googleSheetIds:Array
})

const User = mongoose.model('Users',userSchema)

const APIKeySchema = new mongoose.Schema({
    ApiKey:String,
    googleServiceClientEmail:Object,
    googlePrivateKey:Object,
    active:Boolean
})

const APIKey = mongoose.model('ApiKeys',APIKeySchema)

module.exports = { User, APIKey }