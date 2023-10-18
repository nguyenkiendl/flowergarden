import * as request from '~/utils/request';

export const getCustomers = async () => {
    try {
        const res = await request.get('get_customers.php');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const addCustomer = async (customer) => {
    try {
        const res = await request.post('add_customer.php', customer);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getCustomer = async (params) => {
    try {
        console.log(params);
        const res = await request.get('get_customer.php', params);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateCustomerStatus = async (params) => {
    try {
        const res = await request.post('update_customer_status.php', params);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getOrders = async (params) => {
    try {
        const res = await request.get('get_orders.php', params);
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
