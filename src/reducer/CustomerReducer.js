import { useReducer } from 'react';
import * as customerServices from '~/apiServices/customerServices';
const initialState = {
    dataList: [],
};

const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'FETCH_CUSTOMER':
            console.log({ ...state, dataList: payload });
            return { ...state, dataList: payload };
            break;
        case 'ADD_CUSTOMER_ITEM':
            const Add = async () => {
                const newItem = await customerServices.addCustomer({
                    type: payload.type,
                    number: payload.number,
                });

                return {
                    dataList: {
                        ...state.dataList,
                        newItem,
                    },
                };
            };
            Add();
            break;
        default:
            return initialState;
    }
};

export const CustomerReducer = () => {
    return useReducer(reducer, initialState);
};
