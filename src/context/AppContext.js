import { createContext, useEffect, useState } from 'react';
import * as settingServices from '~/apiServices/settingServices';
import * as customerServices from '~/apiServices/customerServices';
import * as orderServices from '~/apiServices/orderServices';
import { CustomerReducer, actions } from '~/reducer/CustomerReducer';
import { OrderReducer } from '~/reducer/OrderReducer';

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
    const [openBar, setOpenBar] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [customerSide, setCustomerSide] = useState(false);
    const [cartSide, setCartSide] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const value = {
        customerSide,
        setCustomerSide,
        cartSide,
        setCartSide,
        openBar,
        setOpenBar,
        openModal,
        setOpenModal,
        cartCount,
        setCartCount,
    };
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
