import { createContext, useEffect, useState } from 'react';
import * as customerServices from '~/apiServices/customerServices';
import * as orderServices from '~/apiServices/orderServices';
import { CustomerReducer, actions } from '~/reducer/CustomerReducer';

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
    const [openBar, setOpenBar] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [customerSide, setCustomerSide] = useState(false);
    const [productSide, setProductSide] = useState(false);
    const [orderSide, setOrderSide] = useState(false);
    const [customerState, dispatch] = CustomerReducer();
    const { customer, customerList, page, keyword, filters } = customerState;
    const fetchCustomers = async () => {
        const response = await customerServices.getCustomers({
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
        if (window.location.pathname === '/') {
            fetchCustomers();
        }
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
        //console.log('====> run effect 2');
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

    const addOrders = (payload) => {
        const Add = async () => {
            const response = await orderServices.addOrders({
                customer_id: payload.customer_id,
                datas: payload.datas,
            });
            if (response) {
                dispatch(actions.addOrders(response));
            }
        };
        Add();
    };

    const updateOrders = (payload) => {
        const Update = async () => {
            const response = await orderServices.updateOrders({
                customer_id: payload.customer_id,
                datas: payload.datas,
            });
            if (response) {
                dispatch(actions.updateOrders(response));
            }
        };
        Update();
    };

    const searchCustomer = (keyword) => {
        const Search = async () => {
            const response = await customerServices.getCustomers({
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
            const response = await customerServices.getCustomers({
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
        customerSide,
        setCustomerSide,
        productSide,
        setProductSide,
        orderSide,
        setOrderSide,
        addOrders,
        updateOrders,
        openBar,
        setOpenBar,
        openModal,
        setOpenModal,
    };
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
