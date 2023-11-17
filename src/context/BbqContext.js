import { createContext, useState } from 'react';
import { BbqReducer } from '~/reducer/BbqReducer';
export const BbqContext = createContext({});

export const BbqProvider = ({ children }) => {
    const [step, setStep] = useState(1);
    const [info, setInfo] = useState({});
    const [orders, setOrders] = useState([]);
    const [bbq, bbqDispatch] = BbqReducer();

    const setBbqInfo = (info) => {
        bbqDispatch({
            type: 'ADD_INFO',
            payload: info,
        });
    };

    const setBbqOrders = (orders) => {
        bbqDispatch({
            type: 'ADD_ORDERS',
            payload: orders,
        });
    };
    const value = {
        step,
        setStep,
        info,
        setInfo,
        orders,
        setOrders,
        bbq,
        setBbqInfo,
        setBbqOrders,
    };
    return <BbqContext.Provider value={value}>{children}</BbqContext.Provider>;
};
