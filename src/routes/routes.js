// Layouts
import { PrintLayout } from '~/components/Layout';
import CustomerDetail from '~/components/Customer/Detail';
import Home from '~/pages/Home';
import Bartender from '~/pages/Bartender';
import Table from '~/pages/Table';
import TableDetail from '~/pages/Table/TableDetail';
import Booking from '~/pages/Table/TableDetail/Booking';
import Print from '~/pages/Print';
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/bartenders', component: Bartender },
    { path: '/tables', component: Table },
    { path: '/table/:tableId/', component: TableDetail },
    { path: '/table/:tableId/:orderId', component: Booking },
    { path: '/customer/:customerId/:orderId', component: CustomerDetail },
    { path: '/print/:customerId', component: Print, layout: PrintLayout },
];

const privateRoutes = [
    //private routes
];

export { publicRoutes, privateRoutes };
