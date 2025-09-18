import { House, Users } from "lucide-react";

export const sidebarMenu: IACele.Application._Sidebar.SidebarMenu = [
    {
        name: 'Menú',
        groups: [
            {
                name: 'Inicio',
                icon: House,
                routes: [
                    {
                        name: 'Mis ventas',
                        path: '/view/list/sale',
                    },
                ]
            },
        ]
    },
    {
        name: 'Datos',
        groups: [
            {
                name: 'Usuarios',
                icon: Users,
                routes: '/view/list/user',
            }
        ]
    },
];
