import { createContext, useState, useRef } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
// useStates and useRefs
    const [scrollTop,setScrollTop] = useState(true)

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
    const handelFormSubmit = (e, authType) => {
        e.preventDefault()
        const data = convertFormData(e.target)
        console.log(data,authType)
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
