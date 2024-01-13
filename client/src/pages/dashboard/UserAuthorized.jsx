import { Outlet } from 'react-router-dom';
import DashNavBar from './components/DashNavBar';

const UserAuthorized = () => {
    return(
        <main className="main2">
            <DashNavBar/>
            <Outlet/>
        </main>
    )
}

export default UserAuthorized