import { CUSTOMER_TYPE } from './constants';

export const customerType = (type) => {
    return CUSTOMER_TYPE.find((t) => {
        return t.value === type;
    });
};

export const formatPrice = (value) => {
    if (!value) {
        return 0;
    }
    return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');
};
