import { FC } from 'react';
import Example from '../Views/example.mdx';

interface RouteItem {
    path: string;
    component: FC;
}

const routes: RouteItem[] = [
    { path: '/', component: Example },
    { path: '/example1', component: Example },
];

export default routes;
