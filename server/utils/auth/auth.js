const { JWT } = require('google-auth-library')

const authClient = async ( clientEmail, privateKey ) => {
    const client = new JWT({
        email:clientEmail,
        key:privateKey,
        scopes:[
            'https://www.googleapis.com/auth/cloud-platform'
        ]
    })
    try {
        const response = await client.authorize();
        return {
            response:response,
            client:client
        }
    } catch (error) {
        return {
            error:error
        }
    }
}

module.exports = { authClient }