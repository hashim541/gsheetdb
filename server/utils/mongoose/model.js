const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    APIKey:Array,
    googleServiceAccountEmail:String,
    googlePrivateKey:String,
    googleSheetsId:Array
})

const User  = mongoose.model('Users',userSchema)


module.exports = {User}