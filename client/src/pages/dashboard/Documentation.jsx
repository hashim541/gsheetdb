import instructions from "./instructions"
import EachInstructions from "./components/EachInstructions"
const Documentation = () => {
    return(
        <div className="docs">
            <h1>DOCUMENTATION</h1>
            <div className="how-to-get-apikey">
                {instructions.map(data => (
                    <EachInstructions  key={data.title} data={data}/>
                ))}
            </div>
        </div>
    )
}
export default Documentation