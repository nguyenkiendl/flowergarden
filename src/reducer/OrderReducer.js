import { useReducer } from 'react';
const initialState = {
    keyword: '',
    loading: true,
    page: 1,
    error: '',
    orderList: [],
    doing: [],
};

const reducer = (state, action) => {
    const { type, payload } = action;
    console.log(type, state);
    switch (type) {
        case 'FETCH_SUCCESS':
            return {
                ...state,
                orderList: state.orderList.concat(payload),
            };
        case 'FETCH_MORE':
            return {
                ...state,
                page: state.page + 1,
            };
        case 'FETCH_ERROR':
            return {
                ...state,
                orderList: [],
                error: 'Something went wrong!',
            };
        case 'SEARCH_CUSTOMER':
            return {
                ...state,
                page: 1,
                keyword: payload.keyword,
                orderList: payload.dataList,
            };
        default:
            return state;
    }
};

export const OrderReducer = () => {
    return useReducer(reducer, initialState);
};
