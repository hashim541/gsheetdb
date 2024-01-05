import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

const AuthRoutes = () => {
    return (
        <>
            <main className='landing-main'>
                <Navbar />
                <Outlet />
            </main>
        </>
    );
}

export default AuthRoutes;