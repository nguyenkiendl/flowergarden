import { createContext, useEffect, useState } from 'react';
import * as customerServices from '~/apiServices/customerServices';
import { CustomerReducer, actions } from '~/reducer/CustomerReducer';

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
    const [openBar, setOpenBar] = useState(false);
    const [openSide, setOpenSide] = useState(false);
    const [openService, setOpenService] = useState(false);
    const [customerState, dispatch] = CustomerReducer();
    const { customerList, page, customer, keyword, filters } = customerState;

    const fetchCustomers = async () => {
        const response = await customerServices.getOrders({
            params: {
                page: page,
                keyword: keyword,
                filters: filters,
            },
        });
        if (response) {
            dispatch(
                actions.fetchCustomer({
                    dataList: response,
                    keyword: keyword,
                    filters: filters,
                }),
            );
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
            if (window.location.pathname === '/') {
                console.log('totalPages >>>');
                dispatch({ type: 'FETCH_MORE', payload: filters });
            }
        }
    };

    useEffect(() => {
        console.log('====> run effect 2');
        window.addEventListener('scroll', handleScroll);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const setCustomer = (input) => {
        const customerDetail = async () => {
            const response = await customerServices.getCustomer({
                params: {
                    customer_id: input.customer_id,
                },
            });
            if (response) dispatch(actions.setCustomer(response));
        };
        customerDetail();
    };
    const addCustomerItem = (payload) => {
        const Add = async () => {
            const response = await customerServices.addCustomer({
                type: payload.type,
                number: payload.number,
            });
            if (response) dispatch(actions.addCustomerItem(response));
        };
        Add();
    };
    const addService = (payload) => {
        const Add = async () => {
            const response = await customerServices.addService({
                customer_id: payload.customerId,
                product_id: payload.productId,
            });
            if (response) {
                dispatch(actions.addService(response));
            }
        };
        Add();
    };
    const removeService = (service) => {
        const Remove = async () => {
            const response = await customerServices.removeService(service);
            if (response) {
                dispatch(actions.removeService(service));
            } else {
                alert('Fails!');
            }
        };
        Remove();
    };

    const searchCustomer = (keyword) => {
        const Search = async () => {
            const response = await customerServices.getOrders({
                params: {
                    page: page,
                    keyword: keyword,
                    filters: filters,
                },
            });
            if (response)
                dispatch(
                    actions.searchCustomer({
                        dataList: response,
                        keyword: keyword,
                    }),
                );
        };
        Search();
    };

    const filterCustomer = (filters) => {
        const Filter = async () => {
            const response = await customerServices.getOrders({
                params: {
                    page: 1,
                    keyword: keyword,
                    filters: filters,
                },
            });
            if (response) {
                dispatch(
                    actions.filterCustomer({
                        dataList: response,
                        filters: filters,
                    }),
                );
            }
        };
        Filter();
    };

    const value = {
        customerList,
        addCustomerItem,
        customer,
        setCustomer,
        keyword,
        searchCustomer,
        filters,
        filterCustomer,
        addService,
        removeService,
        openSide,
        setOpenSide,
        openService,
        setOpenService,
        openBar,
        setOpenBar,
    };
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
