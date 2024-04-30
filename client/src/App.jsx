import { BrowserRouter as Router, Routes, Route, Navigate,Outlet } from 'react-router-dom';
import AuthRoutes from './pages/auth/AuthRoutes';
import LandingPage from './pages/auth/LandingPage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import Dashboard from './pages/dashboard/Dashboard';
import Setting from './pages/dashboard/Setting';
import Apikey from './pages/dashboard/Apikey';
import Documentation from './pages/dashboard/Documentation';

import Notifications from './pages/Notifications';
import { AppProvider } from './dataContext/AppContext';
import AuthRequired from './AuthRequired';


// function App(){
//   return(
//     <>
//       <AppProvider>
//         <Notifications />
//         <Router>
//           <Routes>

//               <Route path="/" element={<AuthRoutes/>}>
//                 <Route  path='/' element={<LandingPage />} />
//                 <Route path='/login' element={<LoginPage />}/>
//                 <Route path='/register' element={<RegisterPage />} />
//               </Route>


//               <Route path="/dashboard" element={<AuthRequired />}>
//                 <Route path='/' element={<Dashboard />} />
//                 <Route path="ApiKey" element={<Apikey/>}/>
//                 <Route path='documentation' element={<Documentation/>}/> 
//                 <Route path="setting" element={<Setting />}/>
//               </Route>
//               <Route path='*' element={<Navigate to="/dashboard" replace />} />
//           </Routes>
//         </Router>
//       </AppProvider>
//     </>
//   )
// }
function App() {
  return (
    <>
      <AppProvider>
        <Notifications />
        <Router>
          <Routes>
            {/* Authenticated routes */}
            <Route path="/" element={<AuthRoutes />}>
              {/* Landing page */}
              <Route index element={<LandingPage />} />
              {/* Other auth routes */}
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
            </Route>

            {/* Dashboard routes */}
            <Route path="/dashboard" element={<AuthRequired />}>
              <Route index element={<Dashboard />} />
              <Route path="ApiKey" element={<Apikey />} />
              <Route path="documentation" element={<Documentation />} /> 
              <Route path="setting" element={<Setting />} />
            </Route>

            {/* Fallback route */}
            <Route path='*' element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Router>
      </AppProvider>
    </>
  );
}



export default App
