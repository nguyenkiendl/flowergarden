import * as request from '~/utils/request';

export const addToCart = async (datas) => {
    try {
        const res = await request.post('carts/add_to_cart.php', datas);
        return res;
    } catch (error) {
        return error;
    }
};

export const updateCartQuantity = async (datas) => {
    try {
        const res = await request.post('carts/update_cart_quantity.php', datas);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const removeCartItem = async (datas) => {
    try {
        const res = await request.post('carts/remove_cart_item.php', datas);
        return res.data;
    } catch (error) {
        console.log(error);
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
