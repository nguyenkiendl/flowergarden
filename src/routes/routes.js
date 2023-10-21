// Layouts
import { HeaderOnly, PrintLayout } from '~/components/Layout';
import CustomerDetail from '~/components/Customer/Detail';
import Home from '~/pages/Home';
import Article from '~/pages/Article';
import Food from '~/pages/Food';
import Print from '~/pages/Print';
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/tickets', component: Article },
    { path: '/drinking-water', component: Article },
    { path: '/foods', component: Food },
    { path: '/article', component: Article, layout: HeaderOnly },
    { path: '/customer/:customerId', component: CustomerDetail },
    { path: '/print/:customerId', component: Print, layout: PrintLayout },
];

const privateRoutes = [
    //private routes
];

export { publicRoutes, privateRoutes };
