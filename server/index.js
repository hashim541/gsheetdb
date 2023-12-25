const express = require('express')
const { GoogleSpreadsheet } = require('google-spreadsheet')
const { JWT } = require('google-auth-library')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const registerRouts = require('./routers/registerRoute')
const getApiKeyRouts = require('./routers/getApiKeyRoute')
const loginRouts = require('./routers/loginRoute')

const app = express()
const port = 3000
const DB_Username = 'hashim00541x'
const DB_Password = 'P72vzkRm2cd7XxMd'
const DataBase = 'googleSheet'
const mongodbURI=`mongodb+srv://${DB_Username}:${DB_Password}@sheet.bz4evue.mongodb.net/${DataBase}?retryWrites=true&w=majority`
const localURI=`mongodb://127.0.0.1:27017/holySheet`

app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());

// 1xymyqdZ_1S5Nts6pe_dwe6PfHUXBIJsZFEepzHA4agI

mongoose.connect(mongodbURI)
.then(() => {
  console.log('Connected to Database')
})
.catch((err) => {
  console.log('Error connecting to Database :',err)
})


app.use('/user',loginRouts)
app.use('/user',registerRouts)
app.use('/user',getApiKeyRouts)


app.get('/connectToGoogleSheet', async( req, res ) => {
    const sheetID=req.query.sheetID;
    
    const Auth = new JWT({
        email:"producttracker@ecommerce-407706.iam.gserviceaccount.com",
        key:"-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDcnSVNPRnBm3K8\nh2RCm1qo6u2hykbFFLIEaGn995LwwV+Hj2PBNtS/39dCis9A3nJG7E7wz4NGrFVF\nrICBiBPBgHjq5Aa27oMhb697SdjLS8cbr6JWfgwo65kw0Mr10y2j6xP0M1aI8zYo\nbxRDmY+NHovrxmvUhLjNVJ3IuPOtwbEJSEM44JYTNqYcXVkTXPdPS+r0wlE3i2GE\nfFS7vQ8VKSEkUgxXH4FwyjSlxfrIQpCI+Zx/kBxK9hqojjN/Oyk4RbMfbM7iTZAe\n+/LuiOD7fzlKmaxS7aCcHYK4np7ztN42T4F1y6/cfdYZRcK5G/BUNgwMZ3VWNdBV\nCWjlR6pvAgMBAAECggEAK8EnEsiZgSKZgPbBVcyGEJZ3hu0dWB0gqWskCnC9ve48\nSiCQQlPjoiJ9CP+K12zG8XYQugYOHUg0qVrrKcWZVXlrgfqzsjhf3ZPPE/6zdq6S\n0NTmt4zMUJlZiqr+df7qQGZxUK+V7BeAmEhfloCwTebPDXYPENk55c9wc8zq130C\nkQ3azihVGL5v2o2oi2rxI2oaJyNCovrLmwGTN36PqGTn9RyDPTdctwVCdabVSc52\n9cOejX80M+Upa5BezP6s1iLJ9+EHb4jX65AHTbXGHLcyhbSvjlJ/FW4W3SvQZkOC\nTXwPJ8iuDHF8yagZ1M/W+uxudElrAmsI5kOpph/4UQKBgQD2gGJxwUAK+oxYhmHv\nILwwYupyEWlnaL5AtJNp86mDn1Moi3JlkRVvcFWSkuXImvZ9xLFUWr+FIXT41TJp\nNxjdt5eJ51UgTH9+l7NdWwtN8w0z2wOAmOYtSIvt/PakGo+fMOxpW1qgoJr03cT4\nkB2tD0LLUpBWZ3IFAXmmZHf4LQKBgQDlHWRsMZFumH9G1J90U2GznWrbEIo8IS2p\nxwYP072IQDbJU/hXrrVNjY2yII7qHmmP096hOTlWESxqkN8IX71C3DE2NHLsnUif\npFrYMN/biqUqU8DERFQn5Q4CpcfvJc0yZX5C2GMAFfZQhyeytGc+NlkM89NulXcd\nMaysmyvSiwKBgH4O+8kmxcSXiqw+1NiASh0IiNKauueKNjlK31RAqoDIOrOyVGdC\ngc7CiNBzVRV4wfNhYjo8SlMf3/zcsnICHjJMkC+S4QKqfEzV8YEdbTOIx0isiSb7\nikLAJecoBU2405faYhwi/r7EQ1pUC0X+FV8KPeNSrsOxFSsgLQD9wihlAoGAK6zP\nsOQ+EfQWBx2PC/C9Ji0y6nGbuFymxL+Aw1GcxrVe/D/6jlRqkU8TnMoiFDUZ8GX2\nAYvUBzkc22+kZIdDn9QzuV6ELeDJsEz3WFDwy3wBgjEXBRL1a+l5Iz4Q/+CX3iyE\nxh9Tt/d3zeAFzEYhjDV2AkcUnfb2DuWiQgEOeIMCgYEA8tBZJWqUSZY4Uh9jqg4R\n5alLBYJU43n84fSu0d2fNNA+wBpBZ7dBpKkovkG23i1O0b71lXVbOZ94jHLnPf5r\nv3mpCdO2fQUnzxp0XhFsy3bfDZ2At049+sXYKjX5mgzdkUWJuD+0n9sdhOulqO0L\n9OpWj3Yfb9Imb7vnXr5huds=\n-----END PRIVATE KEY-----\n",
        scopes: [ 'https://www.googleapis.com/auth/spreadsheets', ],
    })
    const doc = new GoogleSpreadsheet(sheetID,Auth)
    try {
        await doc.loadInfo()
        const jsonRepresentation = convertGoogleSpreadsheetToJSON(doc);
        res.send(JSON.parse(jsonRepresentation))
    } catch (error) {
        console.log(error)
    }

})

app.listen(port,() => {
    console.log(`server running on port ${port}`)
})

function convertGoogleSpreadsheetToJSON(googleSpreadsheet) {
    const seen = new WeakSet();
    const replacer = (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return '[Circular Reference]';
        }
        seen.add(value);
      }
      return value;
    };
  
    return JSON.stringify(googleSpreadsheet, replacer, 2);
}
