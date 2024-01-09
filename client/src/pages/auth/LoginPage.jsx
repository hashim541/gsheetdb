import {Link} from 'react-router-dom'
import AuthImages from './components/AuthImages'
import InputDiv from './components/InputDiv'
import {motion} from 'framer-motion'

const Login = () => {

    return(
        <main className='auth-main'>
            <div className="auth">
                <div className="auth-div">
                    <h3>LOGIN</h3>
                    <form className='auth-form' action="">
                        <InputDiv field={'email'} placeHolder={"example@gmail.com"} label={'Email'}/>
                        <InputDiv field={'password'} placeHolder={"123456"} label={'password'}/>
                        <InputDiv field={'password'} placeHolder={"123456"} label={'confirm password'}/>
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