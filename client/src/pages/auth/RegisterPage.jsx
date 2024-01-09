import {Link} from 'react-router-dom'
import {motion} from 'framer-motion'
import AuthImages from './components/AuthImages'
import InputDiv from './components/InputDiv'

const Register = () => {
    return(
        <main className='auth-main'>
            <div className="auth">
                <div className="auth-div">
                    <h3>REGISTER</h3>
                    <form className='auth-form' action="">
                        <InputDiv field={'username'} placeHolder={"Your Name"} label={'User Name'}/>
                        <InputDiv field={'email'} placeHolder={"example@gmail.com"} label={'Email'}/>
                        <InputDiv field={'password'} placeHolder={"123456"} label={'password'}/>
                        <InputDiv field={'password'} placeHolder={"123456"} label={'confirm password'}/>
                        <motion.button className='btn register auth-btn'
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >Register</motion.button>
                    </form>
                    <p>already have an <Link to='/login'>account</Link> ?</p>
                </div>
            </div>
            <AuthImages />
        </main>
    )
}

export default Register