import AppContext from './dataContext/AppContext'
import { useContext } from 'react'
import UserAuthorized from './pages/dashboard/UserAuthorized';
import { Navigate } from 'react-router-dom';

const AuthRequired = ()=>{
    const { User } = useContext(AppContext);
    console.log(User)
    return User.auth ? <UserAuthorized /> : <Navigate to="/login" />;
}

export default AuthRequired