import * as request from '~/utils/request';

export const ping = async () => {
    try {
        const res = await request.get('orders/ping.php');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getOrders = async (params) => {
    try {
        const res = await request.get('orders/get_orders.php', params);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getOrdersBy = async (params) => {
    try {
        const res = await request.get('orders/get_orders_by.php', params);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const addOrders = async (options) => {
    try {
        const res = await request.post('orders/add_orders.php', options);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateOrders = async (datas) => {
    try {
        const res = await request.post('orders/update_orders.php', datas);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const removeOrder = async (datas) => {
    try {
        const res = await request.post('orders/remove.php', datas);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateOrderStatus = async (datas) => {
    try {
        const res = await request.post('orders/update_order_status.php', datas);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateDetailStatus = async (datas) => {
    try {
        const res = await request.post('orders/update_detail_status.php', datas);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const addNewOrder = async (options) => {
    try {
        const res = await request.post('orders/add_new_order.php', options);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
