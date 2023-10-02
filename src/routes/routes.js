// Layouts
import { HeaderOnly } from '~/components/Layout';

import Home from '~/pages/Home';
import Article from '~/pages/Article';
import Food from '~/pages/Food';
import Customer from '~/pages/Customer';
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/tickets', component: Article },
    { path: '/drinking-water', component: Article },
    { path: '/foods', component: Food },
    { path: '/article', component: Article, layout: HeaderOnly },
    { path: '/customer', component: Customer },
];

const privateRoutes = [
    //private routes
];

export { publicRoutes, privateRoutes };
