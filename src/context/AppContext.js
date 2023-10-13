import { createContext, useEffect, useState } from 'react';
import * as customerServices from '~/apiServices/customerServices';
export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
    const [openBar, setOpenBar] = useState(false);
    const [openSide, setOpenSide] = useState(false);
    const [openService, setOpenService] = useState(false);
    const [customerList, setCustomerList] = useState([]);

    useEffect(() => {
        const fetchCustomers = async () => {
            const result = await customerServices.getOrders();
            setCustomerList(result);
        };
        fetchCustomers();
        const interval = setInterval(() => {
            fetchCustomers();
        }, 1000 * 10);
        return () => clearInterval(interval);
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
                openBar,
                setOpenBar,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
