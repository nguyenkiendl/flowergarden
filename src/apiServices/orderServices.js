import * as request from '~/utils/request';

export const getOrders = async (params) => {
    try {
        console.log(params);
        const res = await request.get('orders/get_orders.php', params);
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

export const addService = async (options) => {
    try {
        const res = await request.post('add_service.php', options);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const removeService = async (service) => {
    try {
        const res = await request.post('remove_services.php', service);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
