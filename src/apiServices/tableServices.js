import * as request from '~/utils/request';

export const getTables = async (params) => {
    try {
        const res = await request.get('tables/get_tables.php', params);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getTable = async (params) => {
    try {
        const res = await request.get('tables/get_table.php', params);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getTableOrders = async (params) => {
    try {
        const res = await request.get('tables/get_table_orders.php', params);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateStatus = async (params) => {
    try {
        const res = await request.post('tables/update_status.php', params);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
