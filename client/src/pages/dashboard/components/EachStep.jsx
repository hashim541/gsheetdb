const EachStep = ({eachStep}) => {

    if(eachStep.img){
        return(
            <>

            <div className="each-step">
                <p>&rarr;</p>
                <li>{eachStep.text}</li>
            </div>
            <div className="step-img">
                <img src={eachStep.img} alt="" />
            </div>
            </>
        )
    }else{

        return(
            <div className="each-step">
                <p>&rarr;</p>
                <li>{eachStep.text}</li>
            </div>
        )
    }
}

export default EachStep