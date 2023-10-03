// Layouts
import { HeaderOnly } from '~/components/Layout';

import Home from '~/pages/Home';
import Article from '~/pages/Article';
import Food from '~/pages/Food';
import Customer from '~/pages/Customer';
import CustomerAdd from '~/pages/Customer/Customer.add';
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/tickets', component: Article },
    { path: '/drinking-water', component: Article },
    { path: '/foods', component: Food },
    { path: '/article', component: Article, layout: HeaderOnly },
    { path: '/customer', component: Customer },
    { path: '/customer-add', component: CustomerAdd },
];

const privateRoutes = [
    //private routes
];

export { publicRoutes, privateRoutes };
