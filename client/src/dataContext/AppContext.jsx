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
    const [User,setUser] = useState({auth:true})
    const [notification,setNotification] = useState([])
// functions
    const addNotification = (message, status) => {
        let id = Date.now()
        setNotification((prev) => [...prev,{ status, message, id }]);
    
        setTimeout(() => {
        setNotification((prev) => {
            const filteredData = prev.filter((eData) => eData.id !== id);
            return filteredData;
        });
        }, 15000);
    };
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
        if(data.password.length < 8){
            let message = `Password must be atleast 8 characters`
            let status = false
            addNotification(message,status)
            return
        }
        if(authType === 'register' && data.confirmPassword !== data.password){
            let message = `Password and Confirm-password dosen't match`
            let status = false
            addNotification(message,status)
            return
        }
        const options ={
            method:'POST',
            url:url+'/user/'+authType,
            headers: {'Content-Type': 'application/json'},
            data:JSON.stringify(data)
        }
        axios(options)
        .then(response => {
            const userData = response.data.user
            userData.auth=true
            
            setUser(userData)

            addNotification('user loged in successfully',true)
            navigate('/dashboard')
        })
        .catch(error => {
            console.log('Response data:', error.response.data);
            addNotification(error.response.data.error,false)
        });
    }
    

// all data
    const contextValue = {
        User,
        scrollTop,handelWindowHeight,
        handelFormSubmit,
        notification
    };

    return (
        <AppContext.Provider value={contextValue}>
        {children}
        </AppContext.Provider>
    );
};

export default AppContext;
