import { createContext, useEffect, useState } from 'react';
import * as customerSevices from '~/apiServices/customerServices';
export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
    const [openSide, setOpenSide] = useState(false);
    const [openService, setOpenService] = useState(false);
    const [customerList, setCustomerList] = useState([]);

    useEffect(() => {
        const fetchCustomers = async () => {
            const result = await customerSevices.getCustomers();
            setCustomerList(result);
        };
        fetchCustomers();
    }, []);
    return (
        <AppContext.Provider
            value={{
                customerList,
                setCustomerList,
                openSide,
                setOpenSide,
                openService,
                setOpenService,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
