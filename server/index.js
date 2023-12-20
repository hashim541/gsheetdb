const express = require('express')
const {GoogleSpreadsheet} = require('google-spreadsheet')
const { JWT } = require('google-auth-library')

const app = express()
const port = 8080


app.get( '/' , ( req, res ) => {
    const doc = new GoogleSpreadsheet('1xymyqdZ_1S5Nts6pe_dwe6PfHUXBIJsZFEepzHA4agI')
    
    res.send('hello')
})

app.listen(port,() => {
    console.log(`server running on port ${port}`)
})