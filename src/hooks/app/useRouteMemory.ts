import { useCallback, useEffect, useMemo, useState } from "react";
import Breadcrumb from "../../components/common/navbar/Breadcrumb"; // eslint-disable-line
import { useLocation } from "react-router";

/** 
 *  ## Memoria de rutas
 *  Este Custom Hook inicializa los estados y las funciones personalizadas que
 *  se utilizan para gestionar las rutas recientes renderizadas en el
 *  componente {@link Breadcrumb} así como funciones que permiten guardar
 *  valores de estados para ser recuperados si el usuario regresa a la página
 *  usando el componente de rutas recientes.
 */ 
const useRouteMemory = (): IACele.Application.RouteMemory => {

    // Estado inicial memoizado para evitar efectos innecesarios
    const initialRoutes = useMemo<IACele.Application.RecentRoute[]>(
        () => ([]), []
    );

    // Inicialización de estado de matriz de rutas recientes
    const [ routes, setRoutes ] = useState<IACele.Application.RecentRoute[]>(initialRoutes);
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
            setRoutes( (prev) => (prev.slice(0, index + 1)) );
        }, []
    );

    // Función para guardar los datos de la página actual
    const setRouteData = useCallback(
        <T>(key: string, value: T) => {
            // Si existe ruta, se guardan los datos
            if ( routes.length )
            // Se establecen los datos en la ruta
            routes[routes.length - 1].data[key] = value;
        }, [routes]
    );

    // Función para recuperar los datos de la página actual
    const recoverData = <T>(): T => {

        // Se crea la ruta completa en cadena de texto
        const completePath = location.pathname + location.search;

        // Obtención de la ruta actual, evitando errores por uso de efectos tardíos
        const currentRoute = (
            // Si hay rutas...
            routes.length > 0
                // Si la última ruta coincide con la cadena de texto...
                ? routes[routes.length - 1].to === completePath
                    ? routes[routes.length - 1]
                    : routes.length > 1
                        // Si la penúltima ruta coincide con la cadena de texto...
                        ? routes[routes.length - 2].to === completePath
                            ? routes[routes.length - 2]

                            // Se retornan datos vacíos si no existen coincidencias
                            : {data: {}} as IACele.Application.RecentRoute
                        : {data: {}} as IACele.Application.RecentRoute
                : {data: {}} as IACele.Application.RecentRoute
        );

        return currentRoute.data as T;
    };

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

    return { recentRoutes, addRoute, cutRecent, setRouteData, recoverData };
};

export default useRouteMemory;
