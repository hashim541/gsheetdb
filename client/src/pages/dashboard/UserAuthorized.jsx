import { Outlet } from 'react-router-dom';
import DashNavBar from './components/DashNavBar';

const UserAuthorized = () => {
    return(
        <main className="main2">
            <DashNavBar/>
            <main className="submain2">
                <Outlet/>
            </main>
        </main>
    )
}

export default UserAuthorized