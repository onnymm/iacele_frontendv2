import isBaseRoute from "./isBaseRoute";

/** 
 *  ## Ruta
 *  Botón que redirecciona a la ruta proporcionada. Este botón forma parte de
 *  los componentes del menú de la barra lateral.
 *  
 *  ### Parámetros de entrada
 *  - [ `function` ] `onClick`: Función que se ejecuta cuando se da clic en el
 *  componente que la recibe.
 *  - [ {@link IACele.Application.Route Route} ] `route`: Objeto que contiene
 *  una ruta de URL y el nombre de ésta.
 */ 
const Route: React.FC<IACele.Application.RouteComponent> = ({
    onClick,
    route,
}) => {

    return (
        <button
            onClick={onClick}
            className={`${isBaseRoute(location.pathname, route.path) ? "text-white" : ""} text-start sm:hover:text-white active:text-white duration-300`}
        >
            {route.name}
        </button>
    );
};

export default Route;
