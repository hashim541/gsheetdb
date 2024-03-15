import AppContext from '../../../dataContext/AppContext'
import { useContext, useEffect, useState } from 'react'
import EachApikey from './EachApikey'

const UserApikeys = () => {
    const {User} = useContext(AppContext)
    const [apikeys,setApikeys] = useState(User.userApiKeys)
    useEffect(()=>{
        setApikeys(User.userApiKeys)
    },[User])
    return(
        <div className="your-apikeys">
            <h4 className="apikey-h4">Your apikeys</h4>
            <div className="list-of-apikeys">
                {apikeys.map((d,i)=>(
                    <EachApikey key={d.key} data={d} index={i+1} />
                ))}
            </div>
        </div>
    )
}
export default UserApikeys