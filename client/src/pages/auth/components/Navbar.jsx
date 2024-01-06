import {Link} from 'react-router-dom'
import Logoimg from '../../../../asset/images/logo.png'
import { LoginBtn, RegisterBtn } from './Buttons'

const Navbar = ()=>{
    return(
        <nav className="nav1">
            <Link to='/' className='logo'>
                <img src={Logoimg} alt="logo" />
            </Link>
            <LoginBtn x={20}/>
            <RegisterBtn x={20}/>
        </nav>
    )
}

export default Navbar