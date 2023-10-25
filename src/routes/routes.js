// Layouts
import { HeaderOnly, PrintLayout } from '~/components/Layout';
import CustomerDetail from '~/components/Customer/Detail';
import Home from '~/pages/Home';
import Ticket from '~/pages/Ticket';
import Bartender from '~/pages/Bartender';
import Customer from '~/pages/Customer';
import Order from '~/pages/Order';
import Print from '~/pages/Print';
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/tickets', component: Ticket },
    { path: '/bartenders', component: Bartender },
    { path: '/customers', component: Customer },
    { path: '/customer/:customerId/', component: Order },
    { path: '/customer/:customerId/:orderId', component: CustomerDetail },
    { path: '/print/:customerId', component: Print, layout: PrintLayout },
];

const privateRoutes = [
    //private routes
];

export { publicRoutes, privateRoutes };
