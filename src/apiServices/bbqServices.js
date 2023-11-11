import * as request from '~/utils/request';

export const getBbqs = async (params) => {
    try {
        const res = await request.get('bbqs/get_bbqs.php', params);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getBbqProducts = async () => {
    try {
        const res = await request.get('bbqs/get_bbq_products.php');
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

export const updateBbqStatus = async (data) => {
    try {
        const res = await request.post('bbqs/update_bbq_status.php', data);
        return res;
    } catch (error) {
        return error;
    }
};
