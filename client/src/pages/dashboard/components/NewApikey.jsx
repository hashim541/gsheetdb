import InputDiv from '../../auth/components/InputDiv'
import AppContext from '../../../dataContext/AppContext'
import { useContext } from 'react'

const NewApikey = () => {
    const {handelGetApikey} = useContext(AppContext)
    return(
        <div className="new-apikey">
            <h4 className="apikey-h4">Get new apikey</h4>
            <form action="" className="apikey-get-form" onSubmit={(e)=>handelGetApikey(e)}>
                <div className="form-seperator">
                    <div className="fs">
                        <InputDiv field={'username'} name={'email'} placeHolder={'example@gmail.com'} label={'email'} />
                        <InputDiv field={'password'} name={'password'} placeHolder={"123456"} label={'password'}/>
                    </div>
                    <div className="fs">
                        <InputDiv field={'username'} name={'clientEmail'} placeHolder={''} label={'Client Email'} />
                        <InputDiv field={'username'} name={'privateKey'} placeHolder={''} label={'Private Key'} />
                    </div>
                </div>
                <button className="apikey-form-btn btn"> Get Key</button>
            </form>
        </div>
    )
}

export default NewApikey