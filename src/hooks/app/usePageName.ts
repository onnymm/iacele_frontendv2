import { useContext } from "react";
import PageNameContext from "../../contexts/pageNameContext";
import APP_NAME from "../../constants/app/name";

/** 
 *  ## Nombre de página
 *  Este componente renderiza Este Custom Hook crea una función para cambiar el 
 *  nombre de la página y también refleja los cambios en el nombre de la pestaña
 *   del navegador.
 *  
 *  ### Parámetros de entrada
 *  Este componente no requiere parámetros de entrada.
 */ 
const useViewName = () => {

    // Obtención de la función de cambio de estado del nombre
    const { setPageName } = useContext(PageNameContext);

    // Función para establecer el nombre de la página
    const setViewName = (name: string | null) => {

        // Cambio de nombre de la pestaña
        if ( name ) {
            document.title = `${name} | ${APP_NAME}`;
        } else {
            document.title = APP_NAME;
        };

        // Se establece el nombre de la página
        setPageName(name);
    };

    return { setViewName };
};

export default useViewName;
