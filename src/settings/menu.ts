import { HouseRounded, PersonRounded } from "@mui/icons-material";

export const sidebarMenu: IACele.Application.SidebarMenu = [
    {
        name: 'Menú',
        groups: [
            {
                name: 'Inicio',
                icon: HouseRounded,
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
                icon: PersonRounded,
                routes: '/view/list/user',
            }
        ]
    },
    // {
    //     name: 'Experimental',
    //     groups: [
    //         {
    //             name: 'UI-Tests',
    //             icon: ScienceRounded,
    //             routes: '/uitests',
    //         }
    //     ],
    // },
];
