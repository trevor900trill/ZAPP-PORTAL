import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

import CountriesPage from 'pages/countries/index';
import ShopsPage from 'pages/shops/index';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />,
            private: true
        },
        {
            path: 'shops',
            element: <ShopsPage />,
            private: true
        },
        {
            path: 'countries',
            element: <CountriesPage />,
            private: true
        }
    ]
};

export default MainRoutes;
