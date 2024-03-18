import { useState } from "react"
import copySVG from '../../../../asset/svg/copy.svg'
import deleteBlackSVG from '../../../../asset/svg/deleteb.svg'
import deleteWhiteSVG from '../../../../asset/svg/deletew.svg'
import AppContext from "../../../dataContext/AppContext"
import { useContext } from "react"

const EachApikey = ({data,index}) => {
    const { handelCopyApikey, toggleApikeyState, handelDeleteApikey } = useContext(AppContext)
    const [isHover,setIsHover] = useState(false)
    return(
        <div className={index%2 != 0 ? "each-apikey black" : 'each-apikey'}>
            <p className={index%2 != 0 && 'white'}>{index}</p>
            <div className="apikey">
                <p className={index%2 != 0 && 'white'} onMouseEnter={()=>setIsHover(true)} onMouseLeave={()=>{setIsHover(false)}}>{isHover ? data.key : data.key.slice(0,15)+'...'}</p>
                <button className="copy" onClick={()=>handelCopyApikey(data.key)}><img src={copySVG} alt="" /></button>
            </div>
            <p className='apikey-state' style={data.active ? {'color':'#00bf63'} : {'color':'red '}} onClick={()=>{toggleApikeyState(data.key,data.active)}}>{data.active ? 'True' : 'False'}</p>
            <button className='keybtn' onClick={()=>handelDeleteApikey(data.key)}><img src={index%2==0 ? deleteBlackSVG : deleteWhiteSVG} alt="" /></button>
        </div>
    )
}
export default EachApikey