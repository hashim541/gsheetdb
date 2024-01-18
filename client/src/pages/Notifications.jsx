import { motion, AnimatePresence } from 'framer-motion';
import correctSvg from '../../asset/svg/correct.svg'
import wrongSvg from '../../asset/svg/wrong.svg'
import AppContext from '../dataContext/AppContext'
import { useContext, useEffect } from 'react'
const Notifications = () =>{
    const {notification} = useContext(AppContext)
    useEffect(()=>{
        
    })
    return(
        <div className="notifications">
            <AnimatePresence>
                {notification.map((data,i)=>(
                    <EachNotification key={i} status={data.status} message={data.message} />
                ))}
            </AnimatePresence>
        </div>
    )
}
const EachNotification = ({status,message}) =>{
    return(
        <motion.div className="each-notification"
        initial={{opacity:0,x:400}}
        animate={{opacity:1,x:0}}
        exit={{opacity:0,x:400}}
        transition={{duration:.25}}
        >
            <img  src={status ? correctSvg : wrongSvg} alt="" />
            <p>{message}</p>
        </motion.div>
    )
}
export default Notifications