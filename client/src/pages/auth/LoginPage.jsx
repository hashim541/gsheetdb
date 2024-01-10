import {Link} from 'react-router-dom'
import AuthImages from './components/AuthImages'
import InputDiv from './components/InputDiv'
import {motion} from 'framer-motion'

import AppContext from '../../dataContext/AppContext'
import { useContext } from 'react'

const Login = () => {
    const {handelFormSubmit} = useContext(AppContext)
    const authType = 'login'
    return(
        <main className='auth-main'>
            <div className="auth">
                <div className="auth-div">
                    <h3>LOGIN</h3>
                    <form className='auth-form' action="" onSubmit={(e)=>handelFormSubmit(e,authType)}>
                        <InputDiv field={'email'} name={'email'} placeHolder={"example@gmail.com"} label={'Email'}/>
                        <InputDiv field={'password'} name={'password'} placeHolder={"123456"} label={'password'}/>
                        <motion.button className='btn login auth-btn'
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >Login</motion.button>
                    </form>
                    <p>don't have an <Link to='/register'>account</Link> ?</p>
                </div>
            </div>
            <AuthImages />
        </main>
    )
}

export default Login
