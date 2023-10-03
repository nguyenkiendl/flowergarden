import { CUSTOMER_TYPE } from './constants';

export const customerType = (type) => {
    return CUSTOMER_TYPE.find((t) => {
        return t.value === type;
    });
};
