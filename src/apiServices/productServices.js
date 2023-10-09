import * as request from '~/utils/request';

export const products = async () => {
    try {
        const res = await request.get('get_products.php');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
