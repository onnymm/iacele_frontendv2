import { useCallback, useEffect, useMemo, useState } from "react";
import Breadcrumb from "../../components/common/navbar/breadcrumbs/Breadcrumb"; // eslint-disable-line
import { useLocation } from "react-router";

const useRoutes = (): IACele.Application.Routing.BreadcrumbValues => {

    // Estado inicial memoizado para evitar efectos innecesarios
    const initialRoutes = useMemo<IACele.Application.Routing.RouteLink<any>[]>(
        () => ([]), []
    );

    // Inicialización de estado de matriz de rutas recientes
    const [ routes, setRoutes ] = useState<IACele.Application.Routing.RouteLink<any>[]>(initialRoutes);

    // Función para añadir una nueva ruta reciente
    const addRoute = useCallback(
        (route: IACele.Application.Routing.RouteLink<any>) => {

            setRoutes(
                (prev) => {

                    // Si existen rutas...
                    if ( prev.length ) {
                        // Obtención de la última ruta del arreglo
                        const lastRoute = prev[prev.length - 1];
                        // Si la ruta actual es igual a la última ruta...
                        if (lastRoute.to === route.to ) {
                            // No se realizan cambios
                            return (prev);
                        };
                    };
                    // Si no existen cambios o la ruta actual no es igual a la última ruta se agrega ésta.
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
            if ( routes[routes.length - 1] ) {
                // Se aisla el atributo en una variable para evitar advertencias de tipado
                const data = routes[routes.length - 1].data;
                if ( data !== undefined ) {
                    data[key] = value;
                };
            }
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
                    ? routes[routes.length - 1].data as T
                    : routes.length > 1
                        // Si la penúltima ruta coincide con la cadena de texto...
                        ? routes[routes.length - 2].to === completePath
                            ? routes[routes.length - 2].data as T

                            // Se retornan datos vacíos si no existen coincidencias
                            : {} as T
                        : {} as T
                : {} as T
        );

        return currentRoute as T;
    };

    return { routes, setRoutes, addRoute, cutRecent, setRouteData, recoverData };
};

/** 
 *  ## Memoria de rutas
 *  Este Custom Hook inicializa los estados y las funciones personalizadas que
 *  se utilizan para gestionar las rutas recientes renderizadas en el
 *  componente {@link Breadcrumb} así como funciones que permiten guardar
 *  valores de estados para ser recuperados si el usuario regresa a la página
 *  usando el componente de rutas recientes.
 */ 
const useRouteMemory = (): IACele.Application.Routing.BreadcrumbMemory => {

    const { routes, setRoutes, addRoute, cutRecent, setRouteData, recoverData } = useRoutes();

    // Se descarta la última ruta para esto ser mostrado en el componente
    const recentRoutes = useMemo(
        () => (
            routes.slice(0, routes.length - 1)
        ), [routes]
    );

    // Obtención de localización actual en la aplicación
    const location  = useLocation();

    useEffect(
        () => {
            // Obtención de la ruta anterior a la actual en lista de rutas
            const previousRoute = (
                // Si existe algún valor en el índice
                recentRoutes[recentRoutes.length - 2]
                    // Se toma el valor del link
                    ? recentRoutes[recentRoutes.length - 2].to
                    // Si no, se toma el valor indefinido
                    : undefined
            );

            // Obtención de la ruta actual desde la localización provista por React Router
            const currentRoute = location.pathname + location.search;

            // Si la ruta anterior es igual a la actual significa que se presionó el botón de atrás en el navegador
            if ( previousRoute === currentRoute ) {
                // Se remueve la ruta para tener el breadcrumb actualizado y consistente
                setRoutes( (prev) => (prev.slice(0, prev.length - 2)) );
            };
        }, [location.pathname, location.search, recentRoutes, setRoutes]
    );

    return { recentRoutes, addRoute, cutRecent, setRouteData, recoverData };
};

export default useRouteMemory;
