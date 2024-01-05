import {Link} from 'react-router-dom'
import LandSVG from '../../../asset/landing.svg'

const LandingPage = () => {
    return(
        <section className="hero">
            <div className="hero-text">
                <h2 className='hero-h2'>The API that turns <br /><span className='hero-gr gr1'>Google Sheet</span> Into a <span className='gr2'>Database</span>.</h2>
                <p className='hero-p'>Grid DB is a revolutionary API that unlocks the potential of Google Sheets, transforming it into a powerful database platform. With Grid DB, you can easily store, manage, and query your data in Google Sheets, leveraging the familiar and intuitive interface you already know and love.</p>
                <div className="btns-div">
                    <Link to = '/login'>
                        <button className="login btn">Login</button>
                    </Link>

                    <Link to = '/register'>
                        <button className="register btn">Register</button>
                    </Link>
                </div>
            </div>
            <div className="hero-img">
                <img className='hero-image' src={LandSVG} alt="" />
            </div>
        </section>
    );
}

export default LandingPage