import {motion} from 'framer-motion'

import jsonImg from '../../../../asset/images/json.png'
import codeImg from '../../../../asset/images/code.png'
import sheetImg from '../../../../asset/images/sheet.png'


const AuthImages = () => {
    return(
        <div className="auth-img-div">
            <motion.img className='auth-img auth-sheet' 
                initial={{ opacity:0,x:40,y:-10 }} 
                whileInView={{ opacity:1,x:0,y:0 }} 
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                src={sheetImg} 
                alt=""
            />
            <motion.img className='auth-img auth-code'
                initial={{ opacity:0,x:-40 }} 
                whileInView={{ opacity:1,x:0 }} 
                viewport={{ once: true }}
                transition={{ duration: 1,delay:1 }}
                src={codeImg} 
                alt="" 
            />
            <motion.img className='auth-img auth-json' 
                initial={{ opacity:0,x:40,y:-10 }} 
                whileInView={{ opacity:1,x:0,y:0 }} 
                viewport={{ once: true }}
                transition={{ duration: 1,delay:2 }}
                src={jsonImg} 
                alt="" 
            />
        </div>
    )
}

export default AuthImages