// Router.tsx
import { FC } from 'react';
import { MDXProvider } from '@mdx-js/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from './Route.ts';
import BreadCrumbs from '../components/BreadCrumbs/BreadCrumbs';

const AppRouter: FC = () => {
    return (
        <Router>
            <BreadCrumbs />
            <MDXProvider >
                <Routes>
                    {routes.map((route, index) => (
                        <Route key={index} path={route.path} element={<route.component />} />
                    ))}
                </Routes>
            </MDXProvider>
        </Router>
    );
}

export default AppRouter;
