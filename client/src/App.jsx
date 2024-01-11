import { BrowserRouter as Router, Routes, Route, redirect } from 'react-router-dom';
import AuthRoutes from './pages/auth/AuthRoutes';
import LandingPage from './pages/auth/LandingPage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import { AppProvider } from './dataContext/AppContext';

function App(){
  return(
    <>
      <AppProvider>
        <Router>
            <Routes>

              <Route path="/" element={<AuthRoutes/>}>
                <Route path='/' element={<LandingPage />} />
                <Route path='/login' element={<LoginPage />}/>
                <Route path='/register' element={<RegisterPage />} />
              </Route>

              {/* <Route>
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/productList' />
                <Route path='/productDetails' />
                <Route path='/addProduct' />
                <Route path='/notification' />
                <Route path='/setting' />
                <Route path='*' element={<Dashboard/>} />
              </Route> */}

          </Routes>
        </Router>
      </AppProvider>
    </>
  )
}

export default App



// import { useState } from "react";


// function App() {
//   const [res,setRes]=useState(JSON.stringify('hey'))
//   async function handleForm() {
//     const gurl='https://verbose-succotash-x7qvv9qj6942vv9j-3000.app.github.dev'
//     const url = 'http://localhost:3000'
//     const liveurl='https://holy-sheet.onrender.com'
//     console.log('send');
//     const options = {
//       method:'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'apikey':'5ca5543e-f0cc-460e-87ca-0fc46d0c8f58'
//         // 'apikey':'afe9d854-8d41-4c52-95dd-96ca3c0e88f9'
//       },
//       body:JSON.stringify({
//         // username:'hashim',
//         // email:'hashim@gmail.com',
//         // password:'123456',
//         // clientEmail:'producttracker@ecommerce-407706.iam.gserviceaccount.com',
//         // privateKey:'-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDcnSVNPRnBm3K8\nh2RCm1qo6u2hykbFFLIEaGn995LwwV+Hj2PBNtS/39dCis9A3nJG7E7wz4NGrFVF\nrICBiBPBgHjq5Aa27oMhb697SdjLS8cbr6JWfgwo65kw0Mr10y2j6xP0M1aI8zYo\nbxRDmY+NHovrxmvUhLjNVJ3IuPOtwbEJSEM44JYTNqYcXVkTXPdPS+r0wlE3i2GE\nfFS7vQ8VKSEkUgxXH4FwyjSlxfrIQpCI+Zx/kBxK9hqojjN/Oyk4RbMfbM7iTZAe\n+/LuiOD7fzlKmaxS7aCcHYK4np7ztN42T4F1y6/cfdYZRcK5G/BUNgwMZ3VWNdBV\nCWjlR6pvAgMBAAECggEAK8EnEsiZgSKZgPbBVcyGEJZ3hu0dWB0gqWskCnC9ve48\nSiCQQlPjoiJ9CP+K12zG8XYQugYOHUg0qVrrKcWZVXlrgfqzsjhf3ZPPE/6zdq6S\n0NTmt4zMUJlZiqr+df7qQGZxUK+V7BeAmEhfloCwTebPDXYPENk55c9wc8zq130C\nkQ3azihVGL5v2o2oi2rxI2oaJyNCovrLmwGTN36PqGTn9RyDPTdctwVCdabVSc52\n9cOejX80M+Upa5BezP6s1iLJ9+EHb4jX65AHTbXGHLcyhbSvjlJ/FW4W3SvQZkOC\nTXwPJ8iuDHF8yagZ1M/W+uxudElrAmsI5kOpph/4UQKBgQD2gGJxwUAK+oxYhmHv\nILwwYupyEWlnaL5AtJNp86mDn1Moi3JlkRVvcFWSkuXImvZ9xLFUWr+FIXT41TJp\nNxjdt5eJ51UgTH9+l7NdWwtN8w0z2wOAmOYtSIvt/PakGo+fMOxpW1qgoJr03cT4\nkB2tD0LLUpBWZ3IFAXmmZHf4LQKBgQDlHWRsMZFumH9G1J90U2GznWrbEIo8IS2p\nxwYP072IQDbJU/hXrrVNjY2yII7qHmmP096hOTlWESxqkN8IX71C3DE2NHLsnUif\npFrYMN/biqUqU8DERFQn5Q4CpcfvJc0yZX5C2GMAFfZQhyeytGc+NlkM89NulXcd\nMaysmyvSiwKBgH4O+8kmxcSXiqw+1NiASh0IiNKauueKNjlK31RAqoDIOrOyVGdC\ngc7CiNBzVRV4wfNhYjo8SlMf3/zcsnICHjJMkC+S4QKqfEzV8YEdbTOIx0isiSb7\nikLAJecoBU2405faYhwi/r7EQ1pUC0X+FV8KPeNSrsOxFSsgLQD9wihlAoGAK6zP\nsOQ+EfQWBx2PC/C9Ji0y6nGbuFymxL+Aw1GcxrVe/D/6jlRqkU8TnMoiFDUZ8GX2\nAYvUBzkc22+kZIdDn9QzuV6ELeDJsEz3WFDwy3wBgjEXBRL1a+l5Iz4Q/+CX3iyE\nxh9Tt/d3zeAFzEYhjDV2AkcUnfb2DuWiQgEOeIMCgYEA8tBZJWqUSZY4Uh9jqg4R\n5alLBYJU43n84fSu0d2fNNA+wBpBZ7dBpKkovkG23i1O0b71lXVbOZ94jHLnPf5r\nv3mpCdO2fQUnzxp0XhFsy3bfDZ2At049+sXYKjX5mgzdkUWJuD+0n9sdhOulqO0L\n9OpWj3Yfb9Imb7vnXr5huds=\n-----END PRIVATE KEY-----\n',      
//         spreadSheetId:'11V0iILqRDt-K0NX6TH74YKGsE12-P-a-q-xQfTRGw2g',
//         // spreadSheetId:'1BXNEpTaOQUq4hOL-163PIb1jaWKYrtwE5Fk4e2dHp68',
//         sheetIndex:0,
//         query:{header:'Gender',value:'Male',unique:'',return:[]},
//         data:[
//           {
//             'EEID':'E98765',
//             'Full Name':'Mohamed Hashim',
//             'Age':19,
//             'new':'new123'
//           },
//           {
//             'EEID':'E98765',
//             'Full Name':'Mohamed Hashim',
//             'Age':19,
//             'new':'new123'
//           }
//         ],
//         // sheetHeader:['apple','Orange','Banan']
//       })
//     }
    

//     try {
//       const response = await fetch(liveurl+'/query/findMany',options)
//       const data = await response.json()
//       setRes(JSON.stringify(data))
//     } catch (error) {
//       console.error('Error:', error.message);
//     }
//   }
  
  

//   return (
//     <>
//     <main className="auth">
//       <button className="btn login" onClick={()=>handleForm()}>click</button>
//       <pre>{JSON.stringify(JSON.parse(res),null,2)}</pre>
//     </main>
//     </>
//   )
// }

// export default App

// {
//   username:'hashim',
//   email:'hashim@gmail.com',
//   password:'123456',
//   clientEmail:'producttracker@ecommerce-407706.iam.gserviceaccount.com',
//   privateKey:'-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDcnSVNPRnBm3K8\nh2RCm1qo6u2hykbFFLIEaGn995LwwV+Hj2PBNtS/39dCis9A3nJG7E7wz4NGrFVF\nrICBiBPBgHjq5Aa27oMhb697SdjLS8cbr6JWfgwo65kw0Mr10y2j6xP0M1aI8zYo\nbxRDmY+NHovrxmvUhLjNVJ3IuPOtwbEJSEM44JYTNqYcXVkTXPdPS+r0wlE3i2GE\nfFS7vQ8VKSEkUgxXH4FwyjSlxfrIQpCI+Zx/kBxK9hqojjN/Oyk4RbMfbM7iTZAe\n+/LuiOD7fzlKmaxS7aCcHYK4np7ztN42T4F1y6/cfdYZRcK5G/BUNgwMZ3VWNdBV\nCWjlR6pvAgMBAAECggEAK8EnEsiZgSKZgPbBVcyGEJZ3hu0dWB0gqWskCnC9ve48\nSiCQQlPjoiJ9CP+K12zG8XYQugYOHUg0qVrrKcWZVXlrgfqzsjhf3ZPPE/6zdq6S\n0NTmt4zMUJlZiqr+df7qQGZxUK+V7BeAmEhfloCwTebPDXYPENk55c9wc8zq130C\nkQ3azihVGL5v2o2oi2rxI2oaJyNCovrLmwGTN36PqGTn9RyDPTdctwVCdabVSc52\n9cOejX80M+Upa5BezP6s1iLJ9+EHb4jX65AHTbXGHLcyhbSvjlJ/FW4W3SvQZkOC\nTXwPJ8iuDHF8yagZ1M/W+uxudElrAmsI5kOpph/4UQKBgQD2gGJxwUAK+oxYhmHv\nILwwYupyEWlnaL5AtJNp86mDn1Moi3JlkRVvcFWSkuXImvZ9xLFUWr+FIXT41TJp\nNxjdt5eJ51UgTH9+l7NdWwtN8w0z2wOAmOYtSIvt/PakGo+fMOxpW1qgoJr03cT4\nkB2tD0LLUpBWZ3IFAXmmZHf4LQKBgQDlHWRsMZFumH9G1J90U2GznWrbEIo8IS2p\nxwYP072IQDbJU/hXrrVNjY2yII7qHmmP096hOTlWESxqkN8IX71C3DE2NHLsnUif\npFrYMN/biqUqU8DERFQn5Q4CpcfvJc0yZX5C2GMAFfZQhyeytGc+NlkM89NulXcd\nMaysmyvSiwKBgH4O+8kmxcSXiqw+1NiASh0IiNKauueKNjlK31RAqoDIOrOyVGdC\ngc7CiNBzVRV4wfNhYjo8SlMf3/zcsnICHjJMkC+S4QKqfEzV8YEdbTOIx0isiSb7\nikLAJecoBU2405faYhwi/r7EQ1pUC0X+FV8KPeNSrsOxFSsgLQD9wihlAoGAK6zP\nsOQ+EfQWBx2PC/C9Ji0y6nGbuFymxL+Aw1GcxrVe/D/6jlRqkU8TnMoiFDUZ8GX2\nAYvUBzkc22+kZIdDn9QzuV6ELeDJsEz3WFDwy3wBgjEXBRL1a+l5Iz4Q/+CX3iyE\nxh9Tt/d3zeAFzEYhjDV2AkcUnfb2DuWiQgEOeIMCgYEA8tBZJWqUSZY4Uh9jqg4R\n5alLBYJU43n84fSu0d2fNNA+wBpBZ7dBpKkovkG23i1O0b71lXVbOZ94jHLnPf5r\nv3mpCdO2fQUnzxp0XhFsy3bfDZ2At049+sXYKjX5mgzdkUWJuD+0n9sdhOulqO0L\n9OpWj3Yfb9Imb7vnXr5huds=\n-----END PRIVATE KEY-----\n'
// }