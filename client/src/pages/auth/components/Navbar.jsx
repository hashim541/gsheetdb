
import {Link} from 'react-router-dom'
import Logoimg from '../../../../asset/images/logo.png'
import { LoginBtn, RegisterBtn } from './Buttons'
import AppContext from '../../../dataContext/AppContext'
import { useContext,useEffect } from 'react'

const Navbar = ()=>{
    const { scrollTop,handelWindowHeight} = useContext(AppContext)
    useEffect(()=>{
        window.addEventListener('wheel',handelWindowHeight)
    },[scrollTop])
    return(
        <nav className={scrollTop?"nav1 show-nav":'nav1 hide-nav'}>
            <Link to='/' className='logo'>
                <img src={Logoimg} alt="logo" />
            </Link>
            <LoginBtn x={20}/>
            <RegisterBtn x={20}/>
        </nav>
    )
}

export default Navbar