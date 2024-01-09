import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';


const AuthRoutes = () => {
    return (
        <>
            <main className='main'>

                <Navbar />
                <Outlet />
                
            </main>
        </>
    );
}

export default AuthRoutes;