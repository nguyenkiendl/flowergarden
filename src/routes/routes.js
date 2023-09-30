// Layouts
import { HeaderOnly } from '~/components/Layout';

import Home from '~/pages/Home';
import Article from '~/pages/Article';
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/tickets', component: Article },
    { path: '/drinking-water', component: Article },
    { path: '/foods', component: Article },
    { path: '/article', component: Article, layout: HeaderOnly },
];

const privateRoutes = [
    //private routes
];

export { publicRoutes, privateRoutes };
