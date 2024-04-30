import { createContext, useState, useRef } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios'

const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const url='http://localhost:3000'
    const lurl = 'https://gsheetdb.onrender.com'
    const l2url='https://fine-lime-badger-hat.cyclic.app'
// useStates and useRefs

    const [scrollTop,setScrollTop] = useState(true)
    const [User,setUser] = useState({auth:false})
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
        if(data.password.length < 6){
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
            url:lurl+'/user/'+authType,
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
    
    const handelGetApikey = (e) =>{
        e.preventDefault()
        const data = convertFormData(e.target)
        if(data.email != User.email){
            addNotification('Please enter your email address',false)
            return
        }
        const options ={
            method:'POST',
            url:lurl+'/user/getapikey',
            headers: {'Content-Type': 'application/json'},
            data:JSON.stringify(data)
        }
        axios(options)
        .then(response => {
            const userData = response.data
            userData.user.auth = true
            setUser(userData.user)

            addNotification('Apikey created',true)
            navigate('/dashboard')
        })
        .catch(error => {
            console.log('Response data:', error.response.data);
            addNotification(error.response.data.error,false)
        });
    }
    const handelCopyApikey = (apikey) => {
        navigator.clipboard.writeText(apikey)
        .then(()=>{
            addNotification('Copied to clipboard',true)
        })
        .catch(()=>{
            addNotification('Error copying to clipboard',true)
        })
    }
    const toggleApikeyState = (apikey, apikeyState) => {
        const data = {
            key:apikey,
            email:User.email,
            state:!apikeyState
        }
        const options ={
            method:'POST',
            url:lurl+'/user/toggleApikeyState',
            headers: {'Content-Type': 'application/json'},
            data:JSON.stringify(data)
        }
        axios(options)
        .then(response => {
            const newUser = response.data.user
            newUser.auth=true
            setUser(newUser)
        })
        .catch(error => {
            console.log('Response data:', error.response.data);
            addNotification(error.response.data.error,false)
        })
    }   
    const handelDeleteApikey = (key) => {
        const data = {
            key:key,
            email:User.email
        }
        const options ={
            method:'POST',
            url:lurl+'/user/deleteApikey',
            headers: {'Content-Type': 'application/json'},
            data:JSON.stringify(data)
        }
        axios(options)
        .then(response => {
            const newUser = response.data.user
            newUser.auth=true
            setUser(newUser)
        })
        .catch(error => {
            console.log('Response data:', error.response.data);
            addNotification(error.response.data.error,false)
        })
    }

// all data
    const contextValue = {
        User,
        scrollTop,handelWindowHeight,
        handelFormSubmit,
        notification,
        handelGetApikey,handelCopyApikey,toggleApikeyState,handelDeleteApikey
    };

    return (
        <AppContext.Provider value={contextValue}>
        {children}
        </AppContext.Provider>
    );
};

export default AppContext;
