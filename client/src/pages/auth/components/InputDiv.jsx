const InputDiv = ({field,placeHolder,label}) =>{
    return(
        <div className="input">
            <label htmlFor={field}>{label} :</label>
            <input type={field === 'username' ? 'text' : field} name={field} className="auth-input" id={field} placeholder={placeHolder} required/>
        </div>
    )
}

export default InputDiv