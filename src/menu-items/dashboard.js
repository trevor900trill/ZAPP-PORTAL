// assets
import {
    DashboardOutlined,
    SettingOutlined,
    TeamOutlined,
    WalletOutlined,
    BarChartOutlined,
    DiffOutlined,
    UserAddOutlined
} from '@ant-design/icons';

// icons
const icons = {
    DashboardOutlined,
    WalletOutlined,
    BarChartOutlined,
    DiffOutlined,
    TeamOutlined,
    SettingOutlined,
    UserAddOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
    id: 'group-dashboard',
    title: 'Navigation',
    type: 'group',
    children: [
        {
            id: 'Dashboard',
            title: 'Dashboard',
            type: 'item',
            url: '/',
            icon: icons.DashboardOutlined,
            breadcrumbs: false
        },
        {
            id: 'Masters',
            title: 'Masters',
            type: 'collapse',
            icon: icons.TeamOutlined,
            breadcrumbs: false,
            children: [
                {
                    id: 'KYC',
                    title: 'KYC',
                    type: 'item',
                    url: '/kyc',
                    breadcrumbs: false
                },
                {
                    id: 'Banks',
                    title: 'Banks',
                    type: 'item',
                    url: '/banks',
                    breadcrumbs: false
                },
                {
                    id: 'Countries',
                    title: 'Countries',
                    type: 'item',
                    url: '/countries',
                    breadcrumbs: false
                },
                {
                    id: 'Counties',
                    title: 'Counties',
                    type: 'item',
                    url: '/counties',
                    breadcrumbs: false
                },
                {
                    id: 'SubCounties',
                    title: 'SubCounties',
                    type: 'item',
                    url: '/subcounties',
                    breadcrumbs: false
                },
                {
                    id: 'Locations ',
                    title: 'Locations ',
                    type: 'item',
                    url: '/locations',
                    breadcrumbs: false
                },
                {
                    id: 'Localities ',
                    title: 'Localities ',
                    type: 'item',
                    url: '/localities',
                    breadcrumbs: false
                },
                {
                    id: 'Regions ',
                    title: 'Regions ',
                    type: 'item',
                    url: '/regions',
                    breadcrumbs: false
                },
                {
                    id: 'Products',
                    title: 'Products',
                    type: 'item',
                    url: '/',
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'Settings',
            title: 'Settings',
            type: 'collapse',
            icon: icons.SettingOutlined,
            breadcrumbs: false,
            children: [
                {
                    id: 'Users',
                    title: 'Users',
                    type: 'item',
                    url: '/users',
                    breadcrumbs: false
                },
                {
                    id: 'Roles',
                    title: 'Roles',
                    type: 'item',
                    url: '/roles',
                    breadcrumbs: false
                }
            ]
        }
    ]
};

export default dashboard;
