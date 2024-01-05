import {Link} from 'react-router-dom'


const Login = () => {

    return(
        <div className="login-form">
            <h3>LOGIN</h3>
            
            <p>don't have an <Link to='/register'>account</Link> ?</p>
        </div>
    )
}

export default Login