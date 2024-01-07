import {motion} from 'framer-motion'
import LandSVG from '../../../asset/svg/landing.svg'
import { LoginBtn, RegisterBtn } from './components/Buttons'
import keyfeatures from './keyfeatureData'
import EachFeature from './components/EachFeature'
import jsonImg from '../../../asset/images/json.png'
import apiImg from '../../../asset/images/api.png'
import crudImg from '../../../asset/images/crud.png'

const LandingPage = () => {
    return(
        <>
            <motion.img className='landing-json'
                src={jsonImg} 
                alt="" 
                initial={{ position:'absolute',rotate:'-90deg',transform:'rotateY(65deg) rotateX(40deg)'}} 
                whileInView={{ position:'fixed',rotate:'-45deg',transform:'rotateY(30deg) rotateX(10deg)'}} 
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
                        GSheetDB that unlocks the potential of Google Sheets, transforming it into a powerful database platform. With GSheetDB, you can easily store, manage, and query your data in Google Sheets, leveraging the familiar and intuitive interface you already know and love.
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

            <section className='landing-section api-crud'>
                <div className="lan-api lan">
                    <div className="api-text">
                        <motion.h2
                            initial={{ opacity: 0, y: -20 }} 
                            whileInView={{ opacity: 1, y: 0 }} 
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                        >API Integration</motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }} 
                            whileInView={{ opacity: 1, y: 0 }} 
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                        >Our focus is on crafting a robust API that streamlines interactions between the Express server and Google Sheets. This ensures efficient data retrieval, modification, and addition. With Google Sheets accommodating up to <span className='key-f-span'>2&nbsp;million&nbsp;cells</span> per sheet, it becomes an ideal choice for small projects and data collection from Google Forms.</motion.p>
                    </div>
                    <motion.div className="lan-img"
                        initial={{ opacity: 0, x: -20 }} 
                        whileInView={{ opacity: 1, x: 0 }} 
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >
                        <img className='api-img' src={apiImg} alt="" />
                    </motion.div>
                </div>
                <div className="lan lan-crud">
                    <div className="crud-text">
                        <motion.h2
                            initial={{ opacity: 0, y: -20 }} 
                            whileInView={{ opacity: 1, y: 0 }} 
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                        >CRUD Operations</motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }} 
                            whileInView={{ opacity: 1, y: 0 }} 
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                        >Feather empowers users with CRUD (<span className='key-f-span'>Create</span>,
                            <span className='key-f-span'>Read</span>,
                            <span className='key-f-span'>Update</span>,
                            <span className='key-f-span'>Delete</span>
                            ) 
                            operations through the API, akin to MongoDB. This functionality provides precise control over data, ensuring efficient data management and manipulation.</motion.p>
                    </div>
                    <motion.div className="lan-img"
                        initial={{ opacity: 0, x: 20 }} 
                        whileInView={{ opacity: 1, x: 0 }} 
                        viewport={{ once: true }}
                        transition={{ duration: 1.5 }}
                    >
                        <img src={crudImg} alt="" className="crud-img" />
                    </motion.div>
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