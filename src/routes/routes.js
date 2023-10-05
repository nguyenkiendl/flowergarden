// Layouts
import { HeaderOnly } from '~/components/Layout';

import Home from '~/pages/Home';
import Article from '~/pages/Article';
import Food from '~/pages/Food';
import CustomerDetail from '~/components/Customer/Detail';
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/tickets', component: Article },
    { path: '/drinking-water', component: Article },
    { path: '/foods', component: Food },
    { path: '/article', component: Article, layout: HeaderOnly },
    { path: '/customer/:customerId', component: CustomerDetail },
];

const privateRoutes = [
    //private routes
];

export { publicRoutes, privateRoutes };
