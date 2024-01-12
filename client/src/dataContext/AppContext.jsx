import { createContext, useState, useRef } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios'

const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const url='http://localhost:3000'
    const lurl = 'https://holy-sheet.onrender.com'
    const l2url='https://fine-lime-badger-hat.cyclic.app'
// useStates and useRefs

    const [scrollTop,setScrollTop] = useState(true)
    const [User,setUser] = useState({auth:false})
// functions
    const handelWindowHeight = (e) =>{
        if(e.deltaY < 0){
            setScrollTop(true)
        }else{
            setScrollTop(false)
        }
    }
    const convertFormData = (form) => {
        const formData = new FormData(form)
        const data ={}
        for (const [key, value] of formData) {
            data[key]=value
        }

        return data 
    }
    const handelFormSubmit = (e, authType,navigate) => {
        e.preventDefault()
        const data = convertFormData(e.target)
        const options ={
            method:'POST',
            url:lurl+'/user/'+authType,
            headers: {'Content-Type': 'application/json'},
            data:JSON.stringify(data)
        }
        axios(options)
        .then(response => {
            const userData = response.data.user
            userData.auth=true
            
            setUser(userData)
            navigate('/dashboard')
        })
        .catch(error => {
            console.log('Response data:', error.response.data);
        });
    }
    

// all data
    const contextValue = {
        User,
        scrollTop,handelWindowHeight,
        handelFormSubmit
    };

    return (
        <AppContext.Provider value={contextValue}>
        {children}
        </AppContext.Provider>
    );
};

export default AppContext;
