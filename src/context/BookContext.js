import { createContext, useState } from 'react';

export const BookContext = createContext({});

export const BookProvider = ({ children }) => {
    const [saveCart, setSaveCart] = useState(0);
    const value = {
        saveCart,
        setSaveCart,
    };
    return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};
