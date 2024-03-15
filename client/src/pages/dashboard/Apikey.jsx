import NewApikey from "./components/NewApikey"
import UserApikeys from "./components/UserApikeys"

const Apikey = () => {
    return(
        <div className="apikey-route">
            <h2>Apikey</h2>
            <NewApikey />
            <UserApikeys />
        </div>
    )
}

export default Apikey