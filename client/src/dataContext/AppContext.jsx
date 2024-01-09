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

    

// all data
    const contextValue = {
        scrollTop,handelWindowHeight
    };

    return (
        <AppContext.Provider value={contextValue}>
        {children}
        </AppContext.Provider>
    );
};

export default AppContext;
