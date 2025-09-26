import { Database, Hammer, ShieldUser, Users } from "lucide-react";

export const sidebarMenu: IACele.Application._Sidebar.SidebarMenu = [
    {
        name: 'Carpintería',
        groups: [
            {
                name: 'Proyectos',
                icon: Hammer,
                routes: '/view/list/projects',
            }
        ]
    },
    {
        name: 'Carpintería',
        groups: [
            {
                name: 'Proyectos',
                icon: Hammer,
                routes: '/projects'
            }
        ],
    },
    {
        name: 'Datos',
        groups: [
            {
                name: 'Usuarios',
                icon: Users,
                routes: '/view/list/users',
            },
        ],
    },
    {
        name: 'Estructura',
        groups: [
            {
                name: 'Base de datos',
                icon: Database,
                routes: [
                    {
                        name: 'Modelos',
                        path: '/view/list/models',
                    },
                    {
                        name: 'Campos',
                        path: '/view/list/fields',
                    },
                    {
                        name: 'Valores de selección',
                        path: '/view/list/selections',
                    },
                ],
            },
            {
                name: 'Acceso',
                icon: ShieldUser,
                routes: [
                    {
                        name: 'Grupos de acceso',
                        path: '/view/list/groups',
                    },
                    {
                        name: 'Permisos de acceso',
                        path: '/view/list/permissions',
                    },
                ]
            }
        ]
    }
];
