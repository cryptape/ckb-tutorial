// Router.tsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from './Route.ts';
import BreadCrumbs from "../components/BreadCrumbs/BreadCrumbs.tsx";

const AppRouter = () => {
    return (
        <Router>
            <BreadCrumbs />
            <Routes>
                {routes.map((route, index) => (
                        <Route key={index} path={route.path} element={<route.component />} />
                ))}
            </Routes>
        </Router>
    );
}

export default AppRouter;
