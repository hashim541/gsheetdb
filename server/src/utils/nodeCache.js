const NodeCache = require('node-cache')

const sheetCache = new NodeCache()
const apikeyCache = new NodeCache()
module.exports = { sheetCache, apikeyCache }