import * as request from '~/utils/request';

export const getTickets = async () => {
    try {
        const res = await request.get('settings/get_tickets.php');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
