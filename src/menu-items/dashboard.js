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
            id: 'Leave',
            title: 'Leave',
            type: 'collapse',
            icon: icons.TeamOutlined,
            breadcrumbs: false,
            children: [
                {
                    id: 'ApplyLeave',
                    title: 'Apply Leave',
                    type: 'item',
                    url: '/leave',
                    breadcrumbs: false
                },
                {
                    id: 'LeaveHistory',
                    title: 'LeaveHistory',
                    type: 'item',
                    url: '/banks',
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
