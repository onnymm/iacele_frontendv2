import { useCallback, useContext } from "react";
import { useNavigate } from "react-router";
import BreadcrumbsContext from "../../../contexts/breadcrumbsContext";
import Breadcrumb from "./Breadcrumb"; // eslint-disable-line

/** 
 *  ## Ruta reciente
 *  Este componente renderiza un nombre de ruta y permite navegar hacia ésta.
 *  Este componente se utiliza en el componente {@link Breadcrumb}.
 */ 
const Link: React.FC<IACele.Application.BreadcrumbRoute> = ({
    name,
    to,
    index,
}) => {

    // Obtención de función de navegación
    const navigate = useNavigate();
    // Obtención de función para truncar arreglo de rutas
    const { cutRecent } = useContext(BreadcrumbsContext);

    const callback = useCallback(
        () => {
            // Se trunca lista de rutas al índice actual
            cutRecent(index);
            // Se realiza la navegación
            navigate(to);
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

export default Link;
