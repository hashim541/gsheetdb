import {motion} from 'framer-motion'
import {Link} from 'react-router-dom'
export const LoginBtn = ({x}) => {
    return(
        <motion.div className='btn-sh' 
            initial={{ opacity: 0, x: x}} 
            whileInView={{ opacity: 1, x: 0}} 
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 400, damping: 10, duration: 1, delay: 1 }}>
            <Link to = '/login'>
                <motion.button className="login btn"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >Login</motion.button>
            </Link>
        </motion.div>
    )
}
export const RegisterBtn = ({x}) => {
    return(
        <motion.div className='btn-sh' 
            initial={{ opacity: 0, x: x }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 400, damping: 10, duration: 1, delay: 1.5 }}>
            <Link to = '/register'>
                <motion.button className="register btn"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}>Register</motion.button>
            </Link>
        </motion.div>
    )
}
