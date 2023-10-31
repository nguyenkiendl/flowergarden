// Layouts
import { PrintLayout } from '~/components/Layout';
import Home from '~/pages/Home';
import Bartender from '~/pages/Bartender';
import Table from '~/pages/Table';
import TableDetail from '~/pages/Table/TableDetail';
import Booking from '~/pages/Table/TableDetail/Booking';
import PrintTicket from '~/pages/Print/PrintTicket';
import PrintBill from '~/pages/Print/PrintBill';
import PrintProcessing from '~/pages/Print/PrintProcessing';
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/bartenders', component: Bartender },
    { path: '/tables', component: Table },
    { path: '/table/:tableId/', component: TableDetail },
    { path: '/table/:tableId/:orderId', component: Booking },
    { path: '/print-ticket/:customerId', component: PrintTicket, layout: PrintLayout },
    { path: '/print-bill/:orderId', component: PrintBill, layout: PrintLayout },
    { path: '/print-processing/:orderId', component: PrintProcessing, layout: PrintLayout },
];

const privateRoutes = [
    //private routes
];

export { publicRoutes, privateRoutes };
