import { createContext, useEffect, useState } from 'react';
import * as customerServices from '~/apiServices/customerServices';
import { CustomerReducer } from '~/reducer/CustomerReducer';

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
    const [openBar, setOpenBar] = useState(false);
    const [openSide, setOpenSide] = useState(false);
    const [openService, setOpenService] = useState(false);
    const [customerState, dispatch] = CustomerReducer();
    const { dataList, page, totalPages, customer, keyword, filters } = customerState;

    const fetchCustomers = async () => {
        const response = await customerServices.getOrders({
            params: {
                page: page,
                filters: filters,
            },
        });
        if (response) {
            dispatch({ type: 'FETCH_SUCCESS', payload: response });
        } else {
            dispatch({ type: 'FETCH_ERROR' });
        }
    };
    useEffect(() => {
        fetchCustomers();
        // const interval = setInterval(() => {
        //     fetchCustomers();
        // }, 1000 * 10);
        // return () => clearInterval(interval);
    }, [page]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            console.log('totalPages >>>', totalPages);
            console.log(filters);
            dispatch({ type: 'FETCH_MORE', payload: filters });
        }
    };

    useEffect(() => {
        console.log('====> run effect 2');
        window.addEventListener('scroll', handleScroll);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const value = {
        customerList: dataList,
        customer: customer,
        setCustomer: (payload) => {
            console.log(payload);
            const customerDetail = async () => {
                const response = await customerServices.getCustomer({
                    params: {
                        customer_id: payload.customer_id,
                    },
                });
                dispatch({
                    type: 'GET_CUSTOMER_DETAIL',
                    payload: response,
                });
            };
            customerDetail();
        },
        addCustomerItem: (payload) => {
            const Add = async () => {
                const newItem = await customerServices.addCustomer({
                    type: payload.type,
                    number: payload.number,
                });
                dispatch({
                    type: 'ADD_CUSTOMER_ITEM',
                    payload: newItem,
                });
            };
            Add();
        },
        filters: filters,
        filterCustomer: (filters) => {
            console.log(filters);
            const Filter = async () => {
                const response = await customerServices.getOrders({
                    params: {
                        page: page,
                        filters: filters,
                    },
                });
                dispatch({
                    type: 'FILTER_CUSTOMER',
                    payload: {
                        dataList: response,
                        filters: filters,
                    },
                });
            };
            Filter();
        },
        keyword: keyword,
        searchCustomer: (keyword) => {
            const Filter = async () => {
                const response = await customerServices.getOrders({
                    params: {
                        page: page,
                        keyword: keyword,
                        filters: filters,
                    },
                });
                dispatch({
                    type: 'SEARCH_CUSTOMER',
                    payload: {
                        dataList: response,
                        keyword: keyword,
                    },
                });
            };
            Filter();
        },
        removeService: (payload) => {
            const removeService = async () => {
                const result = await customerServices.removeService(payload);
                if (result) {
                    dispatch({
                        type: 'REMOVE_SERVICE',
                        payload: payload,
                    });
                }
            };
            removeService();
        },
        openSide,
        setOpenSide,
        openService,
        setOpenService,
        openBar,
        setOpenBar,
    };
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
