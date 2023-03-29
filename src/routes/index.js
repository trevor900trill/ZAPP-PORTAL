import { useRoutes, useNavigate, Navigate } from 'react-router-dom';

// project import
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';
import MainLayout from 'layout/MainLayout';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    const hasLocalStorage = !!localStorage.getItem('user'); // Change "myItem" to the name of the item you want to check

    const routing = useRoutes([
        {
            path: '/',
            element: hasLocalStorage ? <MainLayout /> : <Navigate to="/login" />,
            children: MainRoutes.children.map((route) => ({
                ...route,
                element: hasLocalStorage ? route.element : <Navigate to="/login" />
            }))
        },
        ...LoginRoutes.children.map((route) => ({
            ...route,
            element: hasLocalStorage ? <Navigate to="/" /> : route.element
        })),
        {
            path: '*',
            element: <Navigate to="/" />
        }
    ]);

    return routing;

    // return useRoutes([MainRoutes, LoginRoutes]);
}
