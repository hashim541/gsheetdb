import {motion} from 'framer-motion'
import LandSVG from '../../../asset/svg/landing.svg'
import { LoginBtn, RegisterBtn } from './components/Buttons'
import keyfeatures from './keyfeatureData'
import EachFeature from './components/EachFeature'
import jsonImg from '../../../asset/images/json.png'

const LandingPage = () => {
    return(
        <>
            <motion.img className='landing-json'
                src={jsonImg} 
                alt="" 
                initial={{ position:'absolute',transform:'rotateY(65deg) rotateX(40deg)'}} 
                whileInView={{ position:'fixed',transform:'rotateY(30deg) rotateX(10deg)'}} 
                viewport={{ once: true }}
                transition={{ duration: 1 }}
            />
            <section className="hero">
                <div className="hero-text">
                    <motion.h1 className='hero-h2' 
                        initial={{ opacity: 0, y: -20 }} 
                        whileInView={{ opacity: 1, y: 0 }} 
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}>
                        The API that turns <br /><span className='hero-gr gr1'>Google Sheet</span><br /> Into a <span className=''>Database</span>.
                    </motion.h1>
                    <motion.p className='hero-p' 
                        initial={{ opacity: 0, y: 20 }} 
                        whileInView={{ opacity: 1, y: 0 }} 
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}>
                        GSheetDB is a revolutionary API that unlocks the potential of Google Sheets, transforming it into a powerful database platform. With GSheetDB, you can easily store, manage, and query your data in Google Sheets, leveraging the familiar and intuitive interface you already know and love.
                    </motion.p>
                    <div className="btns-div">
                        <LoginBtn x={20}/>
                        <RegisterBtn x={20}/>
                    </div>
                </div>
                <div className="hero-img">
                    <motion.img className='hero-image' 
                        initial={{ opacity: 0, y:20}} 
                        whileInView={{ opacity: 1,y:0}} 
                        viewport={{ once: true }}
                        transition={{duration: 1 }}
                        src={LandSVG} alt="" />
                </div>
            </section>
            <section className='landing-section key-f'>
                <motion.h2 className="key-f-text "
                    initial={{ opacity: 0, y: -20 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: .35 }}
                >Key Features</motion.h2>
                <div className="keyfeature">
                    {keyfeatures.map( (data,i) => (
                        <EachFeature key={data.id} data={data} i={i} />
                    ))}
                </div>
            </section>
        </>
    );
}

export default LandingPage