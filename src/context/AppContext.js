import { createContext, useState } from 'react';

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
    const [openSide, setOpenSide] = useState(false);
    const [customerList, setCustomerList] = useState([]);
    return (
        <AppContext.Provider value={{ customerList, setCustomerList, openSide, setOpenSide }}>
            {children}
        </AppContext.Provider>
    );
};