require('dotenv').config()
const crypto = require('crypto')
const zlib = require('zlib');

const algorithm = process.env.ALGORITHM
const secretKey = process.env.SECRETKEY
const key = crypto.createHash('sha256').update(String(secretKey)).digest('base64').substr(0, 32)
const iv = crypto.randomBytes(16)

const encrypt = (text) => {
    const compressed = zlib.deflateSync(text)
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv)
    let encrypted = cipher.update(compressed)
    encrypted = Buffer.concat([encrypted, cipher.final()])
    return {
        iv: iv.toString('hex'),
        encryptedData: encrypted.toString('hex')
    }
}

const decrypt = (text) => {
    let iv = Buffer.from(text.iv, 'hex')
    let encryptedText = Buffer.from(text.encryptedData, 'hex')
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv)
    let decrypted = decipher.update(encryptedText)
    decrypted = Buffer.concat([decrypted, decipher.final()])
    const decompressed = zlib.inflateSync(decrypted)
    return decompressed.toString()
};

module.exports = { encrypt, decrypt };