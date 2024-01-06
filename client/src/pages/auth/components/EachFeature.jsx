import {motion} from 'framer-motion'
const EachFeature = ({data,i}) => {
    return(
        <motion.div className='each-feature'
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 400, damping: 10, duration: 1, delay: i/3 }}
        >
            <img src={data.svg} alt="feature svg" />
            <h3>{data.title}</h3>
            <p>{data.desc}</p>
        </motion.div>
    )
}
export default EachFeature