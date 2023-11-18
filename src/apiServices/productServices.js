import * as request from '~/utils/request';

export const products = async () => {
    try {
        const res = await request.get('products/get_products.php');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const productOptions = async () => {
    try {
        const res = await request.get('products/get_product_options.php');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
