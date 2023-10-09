import * as request from '~/utils/request';

export const getCustomers = async () => {
    try {
        const res = await request.get('get_customers.php');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const addCustomer = async (options) => {
    try {
        const res = await request.post('add_customer.php', options);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
