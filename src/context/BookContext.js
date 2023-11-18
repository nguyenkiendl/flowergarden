import { createContext, useState } from 'react';

export const BookContext = createContext({});

export const BookProvider = ({ children }) => {
    const [saveCart, setSaveCart] = useState(0);
    const [productList, setProductList] = useState([]);
    const [show, setShow] = useState(false);
    const value = {
        saveCart,
        setSaveCart,
        productList,
        setProductList,
        show,
        setShow,
    };
    return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};
