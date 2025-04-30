import { useCallback, useEffect, useMemo, useState } from "react";
import Breadcrumb from "../../components/common/navbar/Breadcrumb"; // eslint-disable-line
import { useLocation } from "react-router";

/** 
 *  ## Breadcrumbs
 *  Este Custom Hook inicializa los estados y las funciones personalizadas que
 *  se utilizan para gestionar las rutas recientes renderizadas en el
 *  componente {@link Breadcrumb}.
 */ 
const useBreadcrumbs = (): IACele.Application.Breadcrumbs => {

    // Inicialización de estado de matriz de rutas recientes
    const [ routes, setRoutes ] = useState<IACele.Application.RecentRoute[]>([]);
    // Obtención de localización actual en la aplicación
    const location  = useLocation();

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
        () => (
            routes.slice(0, routes.length - 1)
        ), [routes]
    );

    useEffect(
        () => {
            // Obtención de la ruta anterior a la actual en lista de rutas
            const previousRoute = (
                recentRoutes[recentRoutes.length - 2]
                    ? recentRoutes[recentRoutes.length - 2].to
                    : undefined
            );
            // Obtención de la ruta actual desde la localización provista por React Router
            const currentRoute = location.pathname + location.search;

            // Si la ruta anterior es igual a la actual significa que se presionó el botón de atrás en el navegador
            if ( previousRoute === currentRoute ) {
                // Se remueve la ruta para tener el breadcrumb actualizado y consistente
                setRoutes( (prev) => (prev.slice(0, prev.length - 2)) );
            };
        }, [location.pathname, location.search, recentRoutes]
    )

    return { recentRoutes, addRoute, cutRecent };
};

export default useBreadcrumbs;
