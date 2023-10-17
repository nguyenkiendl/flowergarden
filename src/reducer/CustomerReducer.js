import { useReducer } from 'react';
const initialState = {
    keyword: '',
    filters: {
        status: 'new',
    },
    loading: true,
    page: 1,
    totalPage: 1,
    error: '',
    dataList: [],
    customer: {},
};

const reducer = (state, action) => {
    const { type, payload } = action;
    console.log(state);
    switch (type) {
        case 'FETCH_SUCCESS':
            return {
                ...state,
                totalPage: payload.totalPage,
                dataList: state.dataList.concat(payload),
            };
        case 'FETCH_MORE':
            return {
                ...state,
                page: state.page + 1,
                filters: state.filters,
            };
        case 'FETCH_ERROR':
            return {
                ...state,
                dataList: [],
                error: 'Something went wrong!',
            };
        case 'SEARCH_CUSTOMER':
            return {
                ...state,
                page: 1,
                keyword: payload.keyword,
                dataList: payload.dataList,
            };
        case 'FILTER_CUSTOMER':
            console.log(state);
            return {
                ...state,
                page: 1,
                filters: payload.filters,
                dataList: payload.dataList,
            };
        case 'ADD_CUSTOMER_ITEM':
            return {
                ...state,
                page: 1,
                filters: { status: 'new' },
                dataList: [...state.dataList, payload],
            };
        case 'GET_CUSTOMER_DETAIL':
            return {
                ...state,
                customer: payload,
            };
        case 'REMOVE_SERVICE':
            const newServices = state.customer.services.filter((obj) => {
                return obj.order_id !== payload.order_id;
            });
            return {
                ...state,
                customer: { ...state.customer, services: newServices },
            };
        default:
            return state;
    }
};

export const CustomerReducer = () => {
    return useReducer(reducer, initialState);
};
