import moment from 'moment';
import 'moment/locale/vi';
moment.locale('vi');
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

export const dateNow = () => {
    return moment().format('DD/MM/YY');
};

export const dateFormat = (value) => {
    if (!value) {
        return '-';
    }
    return moment(value).format('DD/MM/YY');
};

export const timeAgo = (value) => {
    if (!value) {
        return '-';
    }
    return moment(value).fromNow();
};

export const timeIn = (value) => {
    if (!value) {
        return '-';
    }
    return moment(value).format('DD/MM/YY hh:mm');
};

export const timePrint = () => {
    return moment().format('hh:mm');
};

export const mergeCustomers = (arr1, arr2) => {
    let combinedArr = [];

    arr1.forEach((item) => {
        if (!arr2.some((obj) => obj.customer_id === item.customer_id)) {
            combinedArr.push(item);
        }
    });

    return combinedArr.concat(arr2);
};

export const mergeOrders = (arr1, arr2) => {
    let combinedArr = [];

    arr1.forEach((item) => {
        if (!arr2.some((obj) => obj.order_id === item.order_id)) {
            combinedArr.push(item);
        }
    });

    return combinedArr.concat(arr2);
};
