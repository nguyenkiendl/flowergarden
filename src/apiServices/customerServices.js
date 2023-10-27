import * as request from '~/utils/request';

export const ping = async () => {
    try {
        const res = await request.get('customers/ping.php');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getNewCustomers = async () => {
    try {
        const res = await request.get('customers/get_new_customers.php');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getCustomers = async (params) => {
    try {
        const res = await request.get('customers/get_customers.php', params);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getCustomer = async (params) => {
    try {
        const res = await request.get('customers/get_customer.php', params);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const addCustomer = async (customer) => {
    try {
        const res = await request.post('customers/add_customer.php', customer);
        return res;
    } catch (error) {
        return error;
    }
};

export const updateCustomerStatus = async (params) => {
    try {
        const res = await request.post('customers/update_customer_status.php', params);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const printCustomerTicket = async (params) => {
    try {
        const html = await request.get('prints/ticket.php', params);
        return html;
    } catch (error) {
        console.log(error);
    }
};
