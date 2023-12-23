const mongoose = require('mongoose')
const { User } = require('../utils/mongoose/model') 
const { JWT } = require('google-auth-library')

const registerUser = async( req, res ) => {
    const userRegisterData = req.body;
    userRegisterData.privateKey = userRegisterData.privateKey.split('\\n').join('\n')

    const client = await authClient(userRegisterData.clientEmail,userRegisterData.privateKey)
    console.log(client)

    res.send(userRegisterData);
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