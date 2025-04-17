import { useContext, useEffect, useRef, useState } from "react";
import SidebarContext from "../../../contexts/sidebarContext";
import { useLocation, useNavigate } from "react-router";
import GroupRouteButton from "./GroupRouteButton";
import Routes from "./Routes";
import isBaseRoute from "./isBaseRoute";

const RouteGroup: React.FC<IACele.Application.RouteGroup> = ({
    name,
    icon,
    routes,
}) => {

    // Obtención de función de cambio de estado de barra lateral
    const { setIsSidebarOpen } = useContext(SidebarContext);

    // Inicialización de función de navegación
    const navigateTo = useNavigate();
    // Obtención de la ubicación actual de la URL
    const location  = useLocation();
    // Referencia a contenedor de lista para obtener su altura
    const listRef = useRef<HTMLDivElement>(null);

    // Inicialización de estado de lista de rutas abierta
    const [ isOpen, setIsOpen ] = useState<boolean>(false);
    // Inicialización de estado para computar la altura del contenedor de lista de rutas
    const [ height, setHeight ] = useState<number>(0);
    // Inicialización de ruta activa
    const [ isActiveLocation, setIsActiveLocation ] = useState<boolean>(false);

    // Función a ejecutar por rutas individuales
    const routeOnClick = (route: string) => {
        // Navegación a la ruta
        navigateTo(route);
        // Se intenta cerrar la barra lateral
        setIsSidebarOpen(false);
    };

    // Función a ejecutar por el botón de grupo de rutas
    const groupOnClick: () => (void) = () => {
        // Si el grupo sólo es una ruta se navega hacia ella
        if ( typeof routes === 'string' ) {
            // Se ejecuta la función de ruta
            routeOnClick(routes);
        // Si el grupo es una lista de rutas, el botón despliega o contrae la lista de rutas
        } else {
            setIsOpen( (prevState: boolean) => (!prevState) );
        };
    };

    // Ejecución de efecto para calcular la altura de contenedor de rutas
    useEffect(
        () => {
            // Si existe un elemento
            if ( listRef.current ) {
                // Se toma la altura del contenedor de lista de rutas
                setHeight(listRef.current.offsetHeight);
            }
        }, [setHeight]
    );

    // Validación si la ruta actual coincide con la ruta de este componente
    // o alguna de las rutas contenidas pertenece a este grupo de rutas
    useEffect(
        () => {

            // Validación de ruta del grupo si es una cadena de texto
            if ( typeof routes === "string") {
                // Si la ruta es base...
                if ( isBaseRoute(location.pathname, routes) ) {
                    // Se cambia el estado de ubicación activa a verdadero
                    setIsActiveLocation(true);
                } else {
                    // Se cambia el estado de ubicación activa a falso
                    setIsActiveLocation(false);
                };
            
            // Si la ruta es un objeto, significa que es un grupo de rutas
            // (Esto debería ser un else)
            } else if ( typeof routes === "object" ){

                // Iteración por cada una de las rutas del grupo
                routes.forEach(
                    (route) => {
                        // Si alguna de las rutas del grupo es base de la ubicación actual
                        if ( isBaseRoute(location.pathname, route.path) ) {
                            // Se cambia el estado de ubicación activa a verdadero
                            setIsActiveLocation(true);
                        } else {
                            // Se cambia el estado de ubicación activa a falso
                            // Normalmente casi todos los casos terminan aquí pero se debe
                            // mantener el estado en falso de todos modos.
                            setIsActiveLocation(false);
                        }
                    }
                );
            };

        }, [location, routes]
    );

    return (
        <div className="flex flex-col w-full h-min">

            {/* Botón de grupo de rutas */}
            <GroupRouteButton name={name} onClick={groupOnClick} icon={icon} isActiveLocation={isActiveLocation} isOpen={isOpen} routes={routes} />

            {/* Lista de rutas, en caso de existir */}
            {typeof routes === 'object' &&
                <Routes height={height} isOpen={isOpen} listRef={listRef} routes={routes} routeOnClick={routeOnClick} />
            }

        </div>
    );
};

export default RouteGroup;
