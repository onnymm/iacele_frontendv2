import { useCallback, useMemo, useState } from "react";
import Breadcrumb from "../../components/common/navbar/Breadcrumb"; // eslint-disable-line

/** 
 *  ## Breadcrumbs
 *  Este Custom Hook inicializa los estados y las funciones personalizadas que
 *  se utilizan para gestionar las rutas recientes renderizadas en el
 *  componente {@link Breadcrumb}.
 */ 
const useBreadcrumbs = (): IACele.Application.Breadcrumbs => {

    // Inicialización de estado de matriz de rutas recientes
    const [ routes, setRoutes ] = useState<IACele.Application.RecentRoute[]>([]);

    // Función para añadir una nueva ruta reciente
    const addRoute = useCallback(
        (route: IACele.Application.RecentRoute) => {
            setRoutes(
                (prev) => {
                    // Si existen rutas
                    if ( prev.length ) {
                        // Obtención de la última ruta del arreglo
                        const lastRoute = prev[prev.length - 1];
                        // Si la ruta actual es igual a la última ruta, no se agrega
                        if (lastRoute.to === route.to ) {
                            return (prev);
                        };
                    };
                    // Se agrega la ruta
                    return ([ ...prev, route ]);
                }
            );
        }, []
    );

    // Función para truncar lista de rutas recientes en base a índice
    const cutRecent = useCallback(
        (index: number) => {
            setRoutes( (prev) => (prev.slice(0, index)) );
        }, []
    );

    // Se descarta la última ruta para esto ser mostrado en el componente
    const recentRoutes = useMemo(
        () => routes.slice(0, routes.length - 1), [routes]
    );

    return { recentRoutes, addRoute, cutRecent };
};

export default useBreadcrumbs;
