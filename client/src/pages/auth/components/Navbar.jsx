import {Link} from 'react-router-dom'
import Logoimg from '../../../../asset/logo.png'

const Navbar = ()=>{
    return(
        <nav className="nav1">
            <Link to='/' className='logo'>
                <img src={Logoimg} alt="logo" />
            </Link>
            <Link to = '/login'>
                <button className="login btn">Login</button>
            </Link>

            <Link to = '/register'>
                <button className="register btn">Register</button>
            </Link>
        </nav>
    )
}

export default Navbar