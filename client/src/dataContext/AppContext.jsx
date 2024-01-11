import { createContext, useState, useRef } from 'react';
import axios from 'axios'

const AppContext = createContext();

export const AppProvider = ({ children }) => {
// useStates and useRefs
    const [scrollTop,setScrollTop] = useState(true)
    const url='http://localhost:3000'
    const lurl = 'https://holy-sheet.onrender.com'

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
        data.query={header:'Gender',value:'Male',unique:'',return:[]}
        return data 
    }
    const handelFormSubmit = (e, authType) => {
        e.preventDefault()
        const data = convertFormData(e.target)
        const options ={
            method:'POST',
            // url:lurl+'/user/'+authType,
            url:url+'/query/findMany',
            headers: {'Content-Type': 'application/json',
                    'apikey':'5ca5543e-f0cc-460e-87ca-0fc46d0c8f58'},
            data:JSON.stringify(data)
        }
        axios(options)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log('Response data:', error.response.data);
        });
        
    }
    

// all data
    const contextValue = {
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
