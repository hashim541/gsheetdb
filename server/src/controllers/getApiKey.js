const bcrypt = require('bcrypt')
const { v4:uuidv4 } = require('uuid')

const { User, APIKey } = require('../utils/mongoose/model')
const { encrypt, decrypt } = require('../utils/hash/hash')
const { authClient } = require('../utils/auth/auth')

const getApiKey = async(req, res) => {
    const userData = req.body;
    if(!userData.email){
        return res.status(400).json({error:'Please provide an email'})
    }

    if(!userData.clientEmail){
        return res.status(400).json({error:'Please provide a google service client email'})
    }

    if(!userData.privateKey){
        return res.status(400).json({error:'Please provide a google service private key'})
    }

    if(!userData.privateKey.includes('\\n')){
        return res.status(400).json({error:'Please provide with a valid google service private key'})
    }

    userData.privateKey = userData.privateKey.split('\\n').join('\n')

    try {
        await User.findOne({email:userData.email})
        .then((result) => {

            if(result === null){
                return res.status(400).json({error:`Could not finding ${userData.email} in database`})
            }
            
            bcrypt.compare(userData.password, result.password, async(err, isEqual) => {
                if(isEqual){
                    const authRes = await authClient(userData.clientEmail, userData.privateKey)

                    if(authRes.error) {
                        console.log(authRes.error)
                        return res.status(400).json({error:`Please provide an valid credential client_email or private_key`})
                    } else {

                        const clientEmail = encrypt(userData.clientEmail)
                        const privateKey = encrypt(userData.privateKey)
                        const APIKEY = { key:uuidv4(), active:true}

                        const newApiKey = new APIKey({
                            ApiKey:APIKEY.key,
                            googleServiceClientEmail:clientEmail,
                            googlePrivateKey:privateKey,
                            active:true,
                        })
                        
                        newApiKey.save()
                        .then( async(result) => {
                            console.log('APIkey created')
                            await User.findOneAndUpdate(
                                {email:userData.email},
                                {$push:{userApiKeys:APIKEY}},
                                {new:true}
                            )
                            .then((result) => {
                                return res.status(200).json({
                                    succuss:'APIkey created',
                                    user:result
                                })
                            })
                            .catch((err) => {
                                return res.status(400).json({error:'Error in pushing apikey'})
                            })
                        })
                        .catch((err) => {
                            console.log('Error while creating APIkey :',err)
                        })
                        
                    }

                } else {
                    return res.status(400).json({error:'Your password is Incorrect'})
                }
            })
        })
        .catch((error) => {
            console.log('Error in finding user and generating Api key route :',error)
        })
        
    } catch (error) {
        console.log('Error generating Api key route :',error)
    }

}

module.exports = { getApiKey }