import { useCallback, useContext } from "react";
import PageNameContext from "../../contexts/pageNameContext";
import APP_NAME from "../../constants/app/name";
import BreadcrumbsContext from "../../contexts/breadcrumbsContext";
import { useLocation } from "react-router";

/** 
 *  ## Nombre de página
 *  Este componente renderiza Este Custom Hook crea una función para cambiar el 
 *  nombre de la página y también refleja los cambios en el nombre de la pestaña
 *   del navegador.
 *  
 *  ### Parámetros de entrada
 *  Este componente no requiere parámetros de entrada.
 */ 
const useViewName = (): IACele.Hook.PageName => {

    // Obtención de la función de cambio de estado del nombre
    const { setPageName } = useContext(PageNameContext);
    // Obtención de función para agregar ruta a breadcrumb
    const { addRoute } = useContext(BreadcrumbsContext);
    // Obtención de ubicación
    const location = useLocation();

    // Función para establecer el nombre de la página
    const setViewName = useCallback(
        (name: string | null) => {

            // Si un nombre de ruta fue provisto...
            if ( name ) {
                // Cambio de nombre de la pestaña
                document.title = `${name} | ${APP_NAME}`;
                // Se agrega la ruta al breadcrumb
                addRoute({ name, to: location.pathname + location.search })
            } else {
                // Se establece el nombre de la aplicación por defecto
                document.title = APP_NAME;
            };

            // Se establece el nombre de la página
            setPageName(name);
        }, [setPageName, addRoute, location]
    );

    return { setViewName };
};

export default useViewName;
