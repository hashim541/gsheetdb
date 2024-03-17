import {Link} from 'react-router-dom'

import dashSVG from '../../../../asset/svg/dashboard.svg'
import apikeySVG from '../../../../asset/svg/apikey.svg'
import settingSVG from '../../../../asset/svg/setting.svg'
import docSVG from '../../../../asset/svg/doc.svg'


const DashNavBar = () => {
    return(
        <nav className="nav2">
            <h3 className="logo2">GSHEET<span className='db'>DB</span></h3>
            <div className="routes">
                <Link to='/dashboard'><img src={dashSVG} alt="" /> <h4 className='paths'>Dashboard</h4></Link>
                <Link to='/dashboard/Apikey'><img src={apikeySVG} alt="" /> <h4 className='paths'>Apikey</h4></Link>
                <Link to='/dashboard/setting'><img className='padd' src={settingSVG} alt="" /><h4 className='paths'>Setting</h4></Link>
                <Link to = '/dashboard/documentation'><img className='padd' src={docSVG} alt="" /><h4 className='paths'>Docs</h4></Link>
            </div>
            <div className="logout">
                <button className='btn logout-btn'>Logout</button>
            </div>
        </nav>
    )
}
export default DashNavBar