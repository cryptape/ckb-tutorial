import { FC } from 'react';
import HelloWorld from '../Views/HelloWorld.mdx';

interface RouteItem {
    path: string;
    component: FC;
}

const routes: RouteItem[] = [
    { path: '/', component: HelloWorld },
    { path: '/Onboarding/HelloWorld', component: HelloWorld },
];

export default routes;
