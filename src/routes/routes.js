// Layouts
import { PrintLayout } from '~/components/Layout';
import Table from '~/pages/Table';
import TableDetail from '~/pages/Table/TableDetail';
import Booking from '~/pages/Table/TableDetail/Booking';
import PrintBill from '~/pages/Print/PrintBill';
import PrintProcessing from '~/pages/Print/PrintProcessing';
import BookingDetail from '~/pages/Table/TableDetail/Booking/BookingDetail';
import Admin from '~/pages/Admin';
import Store from '~/pages/Admin/Store';
import Bbq from '~/pages/Bbq';
import BbqFinish from '~/pages/Bbq/BbqFinish';
import BbqList from '~/pages/Admin/BbqList';
import BbqDetail from '~/pages/Admin/BbqList/BbqDetail';
import BbqEdit from '~/pages/Admin/BbqList/BbqEdit';
import BbqPrintProcessing from '~/pages/Admin/BbqList/BbqDetail/BbqPrintProcessing';
import Setting from '~/pages/Admin/Setting';
const publicRoutes = [
    { path: '/table-plan', component: Table },
    { path: '/table/:tableId/', component: TableDetail },
    { path: '/table/:tableId/:orderId', component: Booking },
    { path: '/booking-detail/:tableId/:orderId', component: BookingDetail },
    { path: '/print-bill/:tableId', component: PrintBill, layout: PrintLayout },
    { path: '/print-processing/:orderId', component: PrintProcessing, layout: PrintLayout },
    //BBQ
    { path: '/', component: Bbq },
    { path: '/bbq/:bbqId', component: BbqFinish },
];

const privateRoutes = [
    //private routes
    { path: '/super-admin', component: Admin },
    { path: '/super-admin/bbqs', component: BbqList },
    { path: '/super-admin/bbq/:bbqId', component: BbqDetail },
    { path: '/super-admin/bbq-edit/:bbqId/:edit', component: BbqEdit },
    { path: '/super-admin/bbq-print-processing/:bbqId', component: BbqPrintProcessing, layout: PrintLayout },
    { path: '/super-admin/stores', component: Store },
    { path: '/super-admin/settings', component: Setting },
];

export { publicRoutes, privateRoutes };
