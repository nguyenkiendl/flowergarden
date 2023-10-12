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

export const updateCustomerStatus = async (options) => {
    try {
        const res = await request.post('add_customer.php', options);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getOrders = async () => {
    try {
        const res = await request.get('get_orders.php');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const addServices = async (services) => {
    try {
        const res = await request.post('add_services.php', services);
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
