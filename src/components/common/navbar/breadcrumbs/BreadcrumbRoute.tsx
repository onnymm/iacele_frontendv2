import { useCallback, useContext } from "react";
import { useNavigate } from "react-router";
import RouteMemoryContext from "../../../../contexts/breadcrumbsContext";
import Breadcrumb from "./Breadcrumb"; // eslint-disable-line

/** 
 *  ## Ruta reciente
 *  Este componente renderiza un nombre de ruta y permite navegar hacia ésta.
 *  Este componente se utiliza en el componente {@link Breadcrumb}.
 */ 
const BreadcrumbRoute = ({
    name,
    to,
    index,
}: IACeleV2.UI.Breadcrumbs.Route) => {

    // Obtención de función de navegación
    const navigate = useNavigate();
    // Obtención de función para truncar arreglo de rutas
    const { cutRecent } = useContext(RouteMemoryContext);

    const callback = useCallback(
        () => {
            // Se trunca lista de rutas al índice actual
            cutRecent(index);
            // Se realiza la navegación
            navigate(to as string);
        }, [cutRecent, index, navigate, to]
    );

    return (
        <p
            onClick={callback}
            className="max-w-28 overflow-hidden text-primary-500 hover:text-primary-600 hover:underline truncate transition-colors cursor-pointer"
        >
            {name}
        </p>
    );
};

export default BreadcrumbRoute;
