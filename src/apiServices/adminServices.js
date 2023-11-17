import * as request from '~/utils/request';

export const getBbqs = async (params) => {
    try {
        const res = await request.get('admin/get_bbqs.php', params);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getOrders = async (params) => {
    try {
        const res = await request.get('admin/get_orders.php', params);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getStores = async (params) => {
    try {
        const res = await request.get('admin/get_stores.php', params);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
