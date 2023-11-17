import moment from 'moment';
import { useReducer } from 'react';
const dateNow = new Date();
const initialState = {
    info: {
        name: '',
        phone: '',
        adt: 1,
        chd: 0,
        deposit: 0,
        note: '',
        date: dateNow,
        hour: '00',
        minute: '00',
    },
    orders: {},
};

const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'ADD_INFO':
            return {
                ...state,
                info: payload,
            };
        case 'ADD_ORDERS':
            return {
                ...state,
                orders: payload,
            };
        default:
            return state;
    }
};

export const BbqReducer = () => {
    return useReducer(reducer, initialState);
};
