import { createContext, useState } from 'react';

export const BbqContext = createContext({});

export const BbqProvider = ({ children }) => {
    const [step, setStep] = useState(1);
    const [info, setInfo] = useState({});
    const [orders, setOrders] = useState([]);
    const value = {
        step,
        setStep,
        info,
        setInfo,
        orders,
        setOrders,
    };
    return <BbqContext.Provider value={value}>{children}</BbqContext.Provider>;
};
