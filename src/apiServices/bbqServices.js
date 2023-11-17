import * as request from '~/utils/request';

export const getBbqs = async (params) => {
    try {
        const res = await request.get('bbqs/get_bbqs.php', params);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getBbq = async (params) => {
    try {
        const res = await request.get('bbqs/get_bbq.php', params);
        if (res.status) {
            return res.data;
        } else {
            alert(res.message);
        }
    } catch (error) {
        console.log(error);
    }
};

export const getBbqPrintProcessing = async (params) => {
    try {
        const res = await request.get('bbqs/get_bbq_print_processing.php', params);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getBbqProducts = async (params) => {
    try {
        const res = await request.get('bbqs/get_bbq_products.php', params);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const addBbq = async (data) => {
    try {
        const res = await request.post('bbqs/add_bbq.php', data);
        return res;
    } catch (error) {
        return error;
    }
};

export const editBbqOrders = async (data) => {
    try {
        const res = await request.post('bbqs/edit_bbq_orders.php', data);
        return res;
    } catch (error) {
        return error;
    }
};

export const updateBbqStatus = async (data) => {
    try {
        const res = await request.post('bbqs/update_bbq_status.php', data);
        return res;
    } catch (error) {
        return error;
    }
};

export const update = async (data) => {
    try {
        const res = await request.post('bbqs/update.php', data);
        return res;
    } catch (error) {
        return error;
    }
};
