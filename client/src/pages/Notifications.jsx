import correctSvg from '../../asset/svg/correct.svg'
import wrongSvg from '../../asset/svg/wrong.svg'
import AppContext from '../dataContext/AppContext'
import { useContext } from 'react'
const Notifications = () =>{
    const {notification,setNotification} = useContext(AppContext)
    console.log(notification)
    return(
        <div className="notifications">
            {notification.map((data,i)=>(
                <EachNotification key={i} state={data.state} message={data.message} />
            ))}
        </div>
    )
}
const EachNotification = ({state,message}) =>{
    return(
        <div className="each-notification">
            <img src={state ? correctSvg : wrongSvg} alt="" />
            <p>{message}</p>
        </div>
    )
}
export default Notifications