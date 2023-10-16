import { createContext, useEffect, useState } from 'react';
import * as customerServices from '~/apiServices/customerServices';
import { CustomerReducer } from '~/reducer/CustomerReducer';

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
    const [openBar, setOpenBar] = useState(false);
    const [openSide, setOpenSide] = useState(false);
    const [openService, setOpenService] = useState(false);
    const [customerCouter, setCustomerCouter] = useState(0);
    const [customers, dispatch] = CustomerReducer();
    console.log(customers);
    const value = {
        customerList: customers.dataList || [],
        addCustomerItem: (payload) => {
            dispatch({
                type: 'ADD_CUSTOMER_ITEM',
                payload: payload,
            });
        },
        customerCouter,
        setCustomerCouter,
        openSide,
        setOpenSide,
        openService,
        setOpenService,
        openBar,
        setOpenBar,
    };
    const fetchCustomers = async () => {
        const response = await customerServices.getOrders();
        dispatch({ type: 'FETCH_CUSTOMER', payload: response });
    };
    useEffect(() => {
        fetchCustomers();
        // const interval = setInterval(() => {
        //     fetchCustomers();
        // }, 1000 * 10);
        // return () => clearInterval(interval);
    }, []);

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
