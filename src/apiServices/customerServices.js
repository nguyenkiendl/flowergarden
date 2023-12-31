import * as request from '~/utils/request';

export const getCustomers = async (params) => {
    try {
        const res = await request.get('customers/get_customers.php', params);
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
        const res = await request.get('prints/ticket.php', params);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
