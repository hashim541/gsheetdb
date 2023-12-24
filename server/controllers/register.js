const mongoose = require('mongoose')
const { User, APIKey } = require('../utils/mongoose/model')
const { JWT } = require('google-auth-library')
const bcrypt = require('bcrypt')
const saltRound = 10;

const registerUser = async( req, res ) => {
    const userRegisterData = req.body;

    try {
        await User.findOne({
            email:userRegisterData.email
        })
        .then((result) => {

            if( result === null ){
                bcrypt.hash( userRegisterData.password, saltRound, (err, hash) => {
                    const newUser = new User({
                        username:userRegisterData.username,
                        email:userRegisterData.email,
                        password:hash
                    })
                    newUser.save()
                    .then((result) => {
                        console.log('User registered Successfully')
                        res.status(200).json({succuss:'User registered succussfully'})
                    })
                    .catch((error) => {
                        console.log('Error in creating user :',error)
                    })
                })
            } else {
                console.log('User with this Email already exists')
                res.status(400).json({error:'User with this Email already exists'})
            }

        })
        .catch((error) => {
            console.log('Error findOne in User :',error)
        })
    } catch (error) {
        console.log('Error registering a user :',error)
    }

    // userRegisterData.privateKey = userRegisterData.privateKey.split('\\n').join('\n')

    // const client = await authClient(userRegisterData.clientEmail,userRegisterData.privateKey)
    

    // res.send(userRegisterData);
} 


const authClient = async (clientEmail,privateKey) => {
    const client = new JWT({
        email:clientEmail,
        key:privateKey,
        scopes:[
            'https://www.googleapis.com/auth/cloud-platform'
        ]
    })
    try {
        const response = await client.authorize();
        return client
    } catch (error) {
        return res.status(400).json({error:'Error validating client. Please provide valid client email or private key'})
    }
}

module.exports = {registerUser}