const express = require('express')
const {GoogleSpreadsheet} = require('google-spreadsheet')
const { JWT, OAuth2Client } = require('google-auth-library')
const { google } = require('googleapis')

const app = express()
const port = 3000

const client_id = '326791549792-mooofv3o7f550u1dt7cte4brntnq6j8q.apps.googleusercontent.com'
const client_secret = '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'
const redirect_url = 'http://localhost:3000/oauth2callback'

const oAuth2Client = new OAuth2Client(client_id,client_secret,redirect_url)
const Scopes = ['https://www.googleapis.com/auth/spreadsheets']

// type 2
// const auth = new google.auth.GoogleAuth({
//     keyFile:'./keyfile.json',
//     scopes:[
//         'https://www.googleapis.com/auth/spreadsheets'
//     ]
// })

app.get( '/' , async( req, res ) => {
    // type 1
    // const serviceAccount = new JWT({
    //     email:'producttracker@ecommerce-407706.iam.gserviceaccount.com',
    //     key:'-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDcnSVNPRnBm3K8\nh2RCm1qo6u2hykbFFLIEaGn995LwwV+Hj2PBNtS/39dCis9A3nJG7E7wz4NGrFVF\nrICBiBPBgHjq5Aa27oMhb697SdjLS8cbr6JWfgwo65kw0Mr10y2j6xP0M1aI8zYo\nbxRDmY+NHovrxmvUhLjNVJ3IuPOtwbEJSEM44JYTNqYcXVkTXPdPS+r0wlE3i2GE\nfFS7vQ8VKSEkUgxXH4FwyjSlxfrIQpCI+Zx/kBxK9hqojjN/Oyk4RbMfbM7iTZAe\n+/LuiOD7fzlKmaxS7aCcHYK4np7ztN42T4F1y6/cfdYZRcK5G/BUNgwMZ3VWNdBV\nCWjlR6pvAgMBAAECggEAK8EnEsiZgSKZgPbBVcyGEJZ3hu0dWB0gqWskCnC9ve48\nSiCQQlPjoiJ9CP+K12zG8XYQugYOHUg0qVrrKcWZVXlrgfqzsjhf3ZPPE/6zdq6S\n0NTmt4zMUJlZiqr+df7qQGZxUK+V7BeAmEhfloCwTebPDXYPENk55c9wc8zq130C\nkQ3azihVGL5v2o2oi2rxI2oaJyNCovrLmwGTN36PqGTn9RyDPTdctwVCdabVSc52\n9cOejX80M+Upa5BezP6s1iLJ9+EHb4jX65AHTbXGHLcyhbSvjlJ/FW4W3SvQZkOC\nTXwPJ8iuDHF8yagZ1M/W+uxudElrAmsI5kOpph/4UQKBgQD2gGJxwUAK+oxYhmHv\nILwwYupyEWlnaL5AtJNp86mDn1Moi3JlkRVvcFWSkuXImvZ9xLFUWr+FIXT41TJp\nNxjdt5eJ51UgTH9+l7NdWwtN8w0z2wOAmOYtSIvt/PakGo+fMOxpW1qgoJr03cT4\nkB2tD0LLUpBWZ3IFAXmmZHf4LQKBgQDlHWRsMZFumH9G1J90U2GznWrbEIo8IS2p\nxwYP072IQDbJU/hXrrVNjY2yII7qHmmP096hOTlWESxqkN8IX71C3DE2NHLsnUif\npFrYMN/biqUqU8DERFQn5Q4CpcfvJc0yZX5C2GMAFfZQhyeytGc+NlkM89NulXcd\nMaysmyvSiwKBgH4O+8kmxcSXiqw+1NiASh0IiNKauueKNjlK31RAqoDIOrOyVGdC\ngc7CiNBzVRV4wfNhYjo8SlMf3/zcsnICHjJMkC+S4QKqfEzV8YEdbTOIx0isiSb7\nikLAJecoBU2405faYhwi/r7EQ1pUC0X+FV8KPeNSrsOxFSsgLQD9wihlAoGAK6zP\nsOQ+EfQWBx2PC/C9Ji0y6nGbuFymxL+Aw1GcxrVe/D/6jlRqkU8TnMoiFDUZ8GX2\nAYvUBzkc22+kZIdDn9QzuV6ELeDJsEz3WFDwy3wBgjEXBRL1a+l5Iz4Q/+CX3iyE\nxh9Tt/d3zeAFzEYhjDV2AkcUnfb2DuWiQgEOeIMCgYEA8tBZJWqUSZY4Uh9jqg4R\n5alLBYJU43n84fSu0d2fNNA+wBpBZ7dBpKkovkG23i1O0b71lXVbOZ94jHLnPf5r\nv3mpCdO2fQUnzxp0XhFsy3bfDZ2At049+sXYKjX5mgzdkUWJuD+0n9sdhOulqO0L\n9OpWj3Yfb9Imb7vnXr5huds=\n-----END PRIVATE KEY-----\n',
    //     scopes:[
    //         'https://www.googleapis.com/auth/spreadsheets'
    //     ]
    // })
    // res.send(serviceAccount)

    // type 2
    const client = await auth.getClient()
    const data = JSON.stringify(client)
    res.json(JSON.parse(data));
})
// type 3
// app.get('/auth', (req, res) => {
//     const authUrl = oAuth2Client.generateAuthUrl({
//         access_type: 'offline',
//         scope: Scopes,
//     });
//     res.redirect(authUrl);
// });

// app.get('/oauth2callback', async (req, res) => {
//     const { code } = req.query;
//     const { tokens } = await oAuth2Client.getToken(code);
//     // console.log(tokens)
//     // Set credentials directly on the oAuth2Client
//     oAuth2Client.setCredentials(tokens);

//     // Continue with API requests using oAuth2Client
//     console.log('Authentication successful');
//     const timestamp = oAuth2Client.credentials.expiry_date;
//     const date = new Date(timestamp);
//     console.log(date);
//     res.send(oAuth2Client);
// });
// app.get('/accessSheet', ( req, res ) => {
//     const googleSheet = google.sheets({version:'v4',auth:oAuth2Client})
//     res.send(googleSheet)
// })1xymyqdZ_1S5Nts6pe_dwe6PfHUXBIJsZFEepzHA4agI

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
        const jsonRepresentation = convertGoogleSpreadsheetToJSON(doc._rawSheets);
        res.send(JSON.parse(jsonRepresentation))
    } catch (error) {
        console.log(error)
    }

})

app.listen(port,() => {
    console.log(`server running on port ${port}`)
})

function convertGoogleSpreadsheetToJSON(googleSpreadsheet) {
    const seen = new WeakSet(); // To track circular references
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

// const serviceAccount = new JWT({
//     email:'producttracker@ecommerce-407706.iam.gserviceaccount.com',
//     key:'-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDcnSVNPRnBm3K8\nh2RCm1qo6u2hykbFFLIEaGn995LwwV+Hj2PBNtS/39dCis9A3nJG7E7wz4NGrFVF\nrICBiBPBgHjq5Aa27oMhb697SdjLS8cbr6JWfgwo65kw0Mr10y2j6xP0M1aI8zYo\nbxRDmY+NHovrxmvUhLjNVJ3IuPOtwbEJSEM44JYTNqYcXVkTXPdPS+r0wlE3i2GE\nfFS7vQ8VKSEkUgxXH4FwyjSlxfrIQpCI+Zx/kBxK9hqojjN/Oyk4RbMfbM7iTZAe\n+/LuiOD7fzlKmaxS7aCcHYK4np7ztN42T4F1y6/cfdYZRcK5G/BUNgwMZ3VWNdBV\nCWjlR6pvAgMBAAECggEAK8EnEsiZgSKZgPbBVcyGEJZ3hu0dWB0gqWskCnC9ve48\nSiCQQlPjoiJ9CP+K12zG8XYQugYOHUg0qVrrKcWZVXlrgfqzsjhf3ZPPE/6zdq6S\n0NTmt4zMUJlZiqr+df7qQGZxUK+V7BeAmEhfloCwTebPDXYPENk55c9wc8zq130C\nkQ3azihVGL5v2o2oi2rxI2oaJyNCovrLmwGTN36PqGTn9RyDPTdctwVCdabVSc52\n9cOejX80M+Upa5BezP6s1iLJ9+EHb4jX65AHTbXGHLcyhbSvjlJ/FW4W3SvQZkOC\nTXwPJ8iuDHF8yagZ1M/W+uxudElrAmsI5kOpph/4UQKBgQD2gGJxwUAK+oxYhmHv\nILwwYupyEWlnaL5AtJNp86mDn1Moi3JlkRVvcFWSkuXImvZ9xLFUWr+FIXT41TJp\nNxjdt5eJ51UgTH9+l7NdWwtN8w0z2wOAmOYtSIvt/PakGo+fMOxpW1qgoJr03cT4\nkB2tD0LLUpBWZ3IFAXmmZHf4LQKBgQDlHWRsMZFumH9G1J90U2GznWrbEIo8IS2p\nxwYP072IQDbJU/hXrrVNjY2yII7qHmmP096hOTlWESxqkN8IX71C3DE2NHLsnUif\npFrYMN/biqUqU8DERFQn5Q4CpcfvJc0yZX5C2GMAFfZQhyeytGc+NlkM89NulXcd\nMaysmyvSiwKBgH4O+8kmxcSXiqw+1NiASh0IiNKauueKNjlK31RAqoDIOrOyVGdC\ngc7CiNBzVRV4wfNhYjo8SlMf3/zcsnICHjJMkC+S4QKqfEzV8YEdbTOIx0isiSb7\nikLAJecoBU2405faYhwi/r7EQ1pUC0X+FV8KPeNSrsOxFSsgLQD9wihlAoGAK6zP\nsOQ+EfQWBx2PC/C9Ji0y6nGbuFymxL+Aw1GcxrVe/D/6jlRqkU8TnMoiFDUZ8GX2\nAYvUBzkc22+kZIdDn9QzuV6ELeDJsEz3WFDwy3wBgjEXBRL1a+l5Iz4Q/+CX3iyE\nxh9Tt/d3zeAFzEYhjDV2AkcUnfb2DuWiQgEOeIMCgYEA8tBZJWqUSZY4Uh9jqg4R\n5alLBYJU43n84fSu0d2fNNA+wBpBZ7dBpKkovkG23i1O0b71lXVbOZ94jHLnPf5r\nv3mpCdO2fQUnzxp0XhFsy3bfDZ2At049+sXYKjX5mgzdkUWJuD+0n9sdhOulqO0L\n9OpWj3Yfb9Imb7vnXr5huds=\n-----END PRIVATE KEY-----\n',
//     scopes:[
//         'https://www.googleapis.com/auth/spreadsheets'
//     ]
// })
// const doc = new GoogleSpreadsheet('1xymyqdZ_1S5Nts6pe_dwe6PfHUXBIJsZFEepzHA4agI',serviceAccount)

// await doc.loadInfo();

// const responseInfo = {
//     title: doc.title,
//     sheets: doc.sheetsByIndex[0],
// };