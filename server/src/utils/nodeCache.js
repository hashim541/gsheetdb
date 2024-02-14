const NodeCache = require('node-cache')
// const DiskCache = require('diskcache');

const sheetCache = new NodeCache()
const apikeyCache = new NodeCache()

// const sheetCache = new DiskCache();
// const apikeyCache = new DiskCache();


module.exports = { sheetCache, apikeyCache }
