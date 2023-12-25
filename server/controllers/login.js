const bcrypt = require('bcrypt')

const { User } = require('../utils/mongoose/model')

const login = async(req, res) => {
    const userData = req.body

    if(!userData.email && !userData.password){
        return res.status(400).json({error:'Please provide an email or password'})
    }

    try {
        await User.findOne(
            {email:userData.email}
        )
        .then((result) => {

            if(result === null){
                return res.status(400).json({error:`Could not finding ${userData.email} in database`})
            }

            bcrypt.compare(userData.password, result.password, (err, isEqual) => {
                if(isEqual){
                    return res.status(200).json({
                        succuss:'User loged in',
                        user:{
                            username:result.username,
                            email:result.email,
                            userAPIKeys:result.userAPIKeys,
                            googleSheetsIds:result.googleSheetsIds
                        }
                    })
                } else {
                    return res.status(400).json({error:'Your password is Incorrect'})
                }
            })
            
        })
        .catch((error) => {
            return res.status(400).json({error:`Cannot find user with ${userData.email}`})
        })
    } catch (error) {
        console.log('Error while loging user :',error)
    }
}

module.exports = { login }