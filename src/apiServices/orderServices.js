import * as request from '~/utils/request';

export const addOrders = async (options) => {
    try {
        const res = await request.post('orders/add_orders.php', options);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const update = async (datas) => {
    try {
        const res = await request.post('orders/update.php', datas);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const bookingBegin = async (options) => {
    try {
        const res = await request.post('orders/booking_begin.php', options);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const bookingEnd = async (options) => {
    try {
        const res = await request.post('orders/booking_end.php', options);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const printOrderProcessing = async (params) => {
    try {
        const html = await request.get('prints/processing.php', params);
        return html;
    } catch (error) {
        console.log(error);
    }
};

export const printOrderBill = async (params) => {
    try {
        const html = await request.get('prints/bill.php', params);
        return html;
    } catch (error) {
        console.log(error);
    }
};

export const printOrder = async (params) => {
    try {
        const res = await request.get('prints/order.php', params);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const printTable = async (params) => {
    try {
        const res = await request.get('prints/table.php', params);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
