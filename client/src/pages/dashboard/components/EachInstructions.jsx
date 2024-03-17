import EachStep from "./EachStep"

const EachInstructions = ({data}) => {
    return(
        <div className="each-instruction">
            <h3>{data.title}</h3>
            <ul>
                {data.steps.map((eachStep, i) => (
                    <EachStep key={i} eachStep={eachStep}/>
                ))}
            </ul>
        </div>
    )
}

export default EachInstructions