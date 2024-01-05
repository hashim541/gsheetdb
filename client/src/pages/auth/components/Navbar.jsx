import {Link} from 'react-router-dom'

const Navbar = ()=>{
    return(
        <nav className="nav1">
            <Link to='/' className='logo'>
                <h1 className=''>Holy Sheet</h1>
            </Link>
            <Link to = '/login'>
                <button className="login">Login</button>
            </Link>

            <Link to = '/register'>
                <button className="register">Register</button>
            </Link>
        </nav>
    )
}

export default Navbar