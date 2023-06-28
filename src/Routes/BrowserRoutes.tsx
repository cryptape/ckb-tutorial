// Router.tsx
import { FC } from 'react';
import { MDXProvider } from '@mdx-js/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from './Route.ts';
import BreadCrumbs from '../components/BreadCrumbs/BreadCrumbs';
import H1 from "../components/H4/H1.tsx";
import CodeBlock from "../components/CodeBlock/CodeBlock";

const components = {
    h1: H1 as React.FC<JSX.IntrinsicElements['h1']>,
    pre: CodeBlock as React.FC<JSX.IntrinsicElements['pre']>,
};

const AppRouter: FC = () => {
    // @ts-ignore
    return (
        <Router>
            <BreadCrumbs />
            <MDXProvider components={components}>
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
