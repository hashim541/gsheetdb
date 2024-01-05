import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

const AuthRoutes = () => {
    return (
        <>
            <main className='main'>
                <Navbar />
                <main className="sub-main">
                    <Outlet />
                </main>
            </main>
        </>
    );
}

export default AuthRoutes;