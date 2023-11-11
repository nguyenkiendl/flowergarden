// Layouts
import { PrintLayout } from '~/components/Layout';
import Home from '~/pages/Home';
import Table from '~/pages/Table';
import TableDetail from '~/pages/Table/TableDetail';
import Booking from '~/pages/Table/TableDetail/Booking';
import PrintTicket from '~/pages/Print/PrintTicket';
import PrintBill from '~/pages/Print/PrintBill';
import PrintProcessing from '~/pages/Print/PrintProcessing';
import BookingDetail from '~/pages/Table/TableDetail/Booking/BookingDetail';
import Admin from '~/pages/Admin';
import Store from '~/pages/Admin/Store';
import Bbq from '~/pages/Bbq';
const publicRoutes = [
    { path: '/tables', component: Table },
    { path: '/table/:tableId/', component: TableDetail },
    { path: '/table/:tableId/:orderId', component: Booking },
    { path: '/booking-detail/:tableId/:orderId', component: BookingDetail },
    { path: '/print-ticket/:customerId', component: PrintTicket, layout: PrintLayout },
    { path: '/print-bill/:orderId', component: PrintBill, layout: PrintLayout },
    { path: '/print-processing/:orderId', component: PrintProcessing, layout: PrintLayout },
    //BBQ
    { path: '/', component: Bbq },
];

const privateRoutes = [
    //private routes
    { path: '/super-admin', component: Admin },
    { path: '/stores', component: Store },
];

export { publicRoutes, privateRoutes };
