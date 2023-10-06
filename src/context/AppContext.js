import { createContext, useEffect, useState } from 'react';

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
    const [openSide, setOpenSide] = useState(false);
    const [openService, setOpenService] = useState(false);
    const [customerList, setCustomerList] = useState([]);

    useEffect(() => {
        let customerDatas = [
            {
                id: 1,
                code: '00001',
                type: 'flower',
                number: 1,
                date: '03-10-2023',
                services: [],
            },
            {
                id: 2,
                code: '00002',
                type: 'hotel',
                number: 1,
                date: '03-10-2023',
                services: [],
            },
            {
                id: 3,
                code: '00003',
                type: 'flower',
                number: 10,
                date: '03-10-2023',
                services: [],
            },
        ];
        setCustomerList(customerDatas);
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
