const bcrypt = require('bcrypt')


const { User } = require('../utils/mongoose/model')
const saltRound = 10;


const registerUser = async( req, res ) => {
    const userRegisterData = req.body;

    if(!userRegisterData.email){
        return res.status(400).json({error:'Please provide an email'})
    }

    try {

        await User.findOne({
            email:userRegisterData.email
        })
        .then( ( result ) => {

            if( result === null ){

                bcrypt.hash( userRegisterData.password, saltRound, ( err, hash ) => {
                    const newUser = new User({
                        username:userRegisterData.username,
                        email:userRegisterData.email,
                        password:hash
                    })

                    newUser.save()
                    .then( ( result ) => {
                        console.log('User registered Successfully')


                        res.status(200).json({
                            succuss:'User registered succussfully',
                            user:{
                                username:result.username,
                                email:result.email,
                                userApiKeys:result.userApiKeys,
                                googleSheetIds:result.googleSheetIds
                            }
                        })
                    })
                    .catch( ( error ) => {
                        console.log('Error in creating user :',error)
                        res.status(400).json({error:'Cannot register user'})
                    })

                })
            } else {
                console.log('User with this Email already exists')
                res.status(400).json({error:`User with ${userRegisterData.email} already exists`})
            }

        })
        .catch( ( error ) => {
            console.log('Error findOne in User :',error)
        })
    } catch( error ) {
        console.log('Error registering a user :',error)
    }
} 




module.exports = {registerUser}