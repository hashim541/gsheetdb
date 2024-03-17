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

const toggleApikeyState = async ( req, res ) => {
    const data = req.body
    try {
        if(data.key == undefined) throw new Error('Please provide an apikey')
        if(data.email == undefined) throw new Error('Please provide an email')
        if(data.state == undefined) throw new Error('Please provide an apikey state')

        APIKey.updateOne({ApiKey:data.key},{$set:{active:data.state}})
        .then(resul => {
            console.log(data,resul)
        })
        .catch(error => {
            throw new Error (error.message)
        })
        User.findOne({email:data.email})
            .then(result =>{
                const filteredData = result.userApiKeys.map(d => {
                    if(d.key == data.key){
                        d.active = data.state
                    }
                    return d
                })
                User.findOneAndUpdate({email:data.email},{$set : {userApiKeys :filteredData}})
                .then(resu => {
                    resu.userApiKeys = filteredData
                    res.status(200).json({user:resu})
                })
                .catch(error => {
                    throw new Error (error.message)
                })
            })
        .catch(error => {
            throw new Error (error.message)
        })
        

    } catch (error) {
        console.log(error.message)
        res.status(400).json({error: error.message})
    }

}

const deleteApikey = async( req, res ) => {

    const data = req.body
    try {
        
        if(data.key == undefined) throw new Error('Please provide an apikey')
        if(data.email == undefined) throw new Error('Please provide an email')

        APIKey.deleteOne({ApiKey:data.key})
        .then(result1 => {
            User.findOne({email:data.email})
            .then(result =>{
                const filteredData = result.userApiKeys.filter(d => {
                    if(d.key != data.key){
                        return d
                    }
                })
                User.findOneAndUpdate({email:data.email},{$set : {userApiKeys :filteredData}})
                .then(resu => {
                    resu.userApiKeys = filteredData
                    res.status(200).json({user:resu})
                })
                .catch(error => {
                    throw new Error (error.message)
                })
            })
        }).catch(error => {
            throw new Error (error.message)
        })

    } catch (error) {
        console.log(error.message)
        res.status(400).json({error: error.message})
    }

}

module.exports = { getApiKey, toggleApikeyState, deleteApikey }