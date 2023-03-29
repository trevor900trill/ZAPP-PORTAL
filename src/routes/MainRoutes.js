import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

import UsersPage from 'pages/users/index';
import LocationsPage from 'pages/locations/index';
import CountriesPage from 'pages/countries/index';

import CountiesPage from 'pages/counties/index';
import LocalitiesPage from 'pages/localities/index';
import SubCountiesPage from 'pages/subCounties/index';
import RegionsPage from 'pages/regions/index';
import RolesPage from 'pages/roles/index';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));

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
            path: 'kyc',
            element: <KYCPage />,
            private: true
        },
        {
            path: 'users',
            element: <UsersPage />,
            private: true
        },
        {
            path: 'locations',
            element: <LocationsPage />,
            private: true
        },
        {
            path: 'localities',
            element: <LocalitiesPage />,
            private: true
        },
        {
            path: 'countries',
            element: <CountriesPage />,
            private: true
        },
        {
            path: 'counties',
            element: <CountiesPage />,
            private: true
        },
        {
            path: 'subcounties',
            element: <SubCountiesPage />,
            private: true
        },
        {
            path: 'banks',
            element: <BanksPage />,
            private: true
        },
        {
            path: 'regions',
            element: <RegionsPage />,
            private: true
        },
        {
            path: 'roles',
            element: <RolesPage />,
            private: true
        },
        {
            path: 'color',
            element: <Color />,
            private: true
        },
        {
            path: 'sample-page',
            element: <SamplePage />,
            private: true
        },
        {
            path: 'shadow',
            element: <Shadow />,
            private: true
        },
        {
            path: 'typography',
            element: <Typography />,
            private: true
        },
        {
            path: 'icons/ant',
            element: <AntIcons />,
            private: true
        }
    ]
};

export default MainRoutes;
