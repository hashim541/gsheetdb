const InputDiv = ({field,name,placeHolder,label}) =>{
    return(
        <div className="input">
            <label htmlFor={field}>{label} :</label>
            <input type={field === 'username' ? 'text' : field} name={name} className="auth-input" id={name} placeholder={placeHolder} required/>
        </div>
    )
}

export default InputDiv