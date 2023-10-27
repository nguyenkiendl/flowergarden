import * as request from '~/utils/request';

export const addToCart = async (datas) => {
    try {
        const res = await request.post('carts/add_to_cart.php', datas);
        return res;
    } catch (error) {
        return error;
    }
};

export const getCarts = async (params) => {
    try {
        const res = await request.get('carts/get_carts.php', params);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
