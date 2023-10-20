import { useReducer } from 'react';
const initialState = {
    keyword: '',
    filters: {
        status: 'new',
    },
    loading: true,
    page: 1,
    error: '',
    customerList: [],
    customer: {
        orders: [],
        discounts: [],
    },
};

export const actions = {
    fetchCustomer: (payload) => {
        return {
            type: 'FETCH_SUCCESS',
            payload: payload,
        };
    },
    setCustomer: (data) => {
        return {
            type: 'SET_CUSTOMER',
            payload: data,
        };
    },
    addCustomerItem: (data) => {
        return {
            type: 'ADD_CUSTOMER_ITEM',
            payload: data,
        };
    },
    searchCustomer: (payload) => {
        return {
            type: 'SEARCH_CUSTOMER',
            payload: payload,
        };
    },
    filterCustomer: (payload) => {
        return {
            type: 'FILTER_CUSTOMER',
            payload: payload,
        };
    },
    addService: (payload) => {
        return {
            type: 'ADD_SERVICE',
            payload: payload,
        };
    },
    addServices: (payload) => {
        return {
            type: 'ADD_SERVICES',
            payload: payload,
        };
    },
    removeService: (service) => {
        return {
            type: 'REMOVE_SERVICE_ITEM',
            payload: service,
        };
    },
    addOrders: (payload) => {
        return {
            type: 'ADD_ORDERS',
            payload: payload,
        };
    },
    updateOrders: (payload) => {
        return {
            type: 'UPDATE_ORDERS',
            payload: payload,
        };
    },
};

const reducer = (state, action) => {
    const { type, payload } = action;
    console.log(type, state);
    switch (type) {
        case 'FETCH_SUCCESS':
            return {
                ...state,
                keyword: payload.keyword,
                filters: payload.filters,
                customerList: state.customerList.concat(payload.dataList),
            };
        case 'FETCH_MORE':
            return {
                ...state,
                page: state.page + 1,
            };
        case 'FETCH_ERROR':
            return {
                ...state,
                customerList: [],
                error: 'Something went wrong!',
            };
        case 'SEARCH_CUSTOMER':
            return {
                ...state,
                page: 1,
                keyword: payload.keyword,
                customerList: payload.dataList,
            };
        case 'FILTER_CUSTOMER':
            return {
                ...state,
                page: 1,
                filters: payload.filters,
                customerList: payload.dataList,
            };
        case 'ADD_CUSTOMER_ITEM':
            return {
                ...state,
                page: 1,
                filters: { status: 'new' },
                customerList: [...state.customerList, payload],
            };
        case 'SET_CUSTOMER':
            return {
                ...state,
                customer: payload,
            };
        case 'ADD_ORDERS':
            return {
                ...state,
                customer: { ...state.customer, orders: payload },
            };
        case 'UPDATE_ORDERS':
            console.log({
                ...state,
                customer: { ...state.customer, orders: payload },
            });
            return {
                ...state,
                customer: { ...state.customer, orders: payload },
            };
        default:
            return state;
    }
};

export const CustomerReducer = () => {
    return useReducer(reducer, initialState);
};
