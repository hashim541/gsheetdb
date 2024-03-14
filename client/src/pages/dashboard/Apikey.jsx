import InputDiv from "../auth/components/InputDiv"
import AppContext from '../../dataContext/AppContext'
import { useContext } from 'react'

const Apikey = () => {
    const {User,handelGetApikey} = useContext(AppContext)
    return(
        <div className="apikey-route">
            <h2>Apikey</h2>
            <div className="new-apikey">
                <h4 className="apikey-h4">Get new apikey</h4>
                <form action="" className="apikey-get-form" onSubmit={(e)=>handelGetApikey(e)}>
                    <InputDiv field={'username'} name={'email'} placeHolder={'example@gmail.com'} label={'email'} />
                    <InputDiv field={'password'} name={'password'} placeHolder={"123456"} label={'password'}/>
                    <InputDiv field={'username'} name={'clientEmail'} placeHolder={''} label={'Client Email'} />
                    <InputDiv field={'username'} name={'privateKey'} placeHolder={''} label={'Private Key'} />
                    <button className="apikey-form-btn btn"> Get Key</button>
                </form>
            </div>
            <div className="your-apikeys">
                <h4 className="apikey-h4">Your apikeys</h4>
            </div>
        </div>
    )
}

export default Apikey