import RouteGroup from "./RouteGroup";
import StickySectionTag from "./StickySectionTag";

/** 
 *  ## Sección de rutas
 *  Este componente renderiza una sección de rutas que incluye un encabezado y
 *  uno o más botones de grupos de rutas.
 *  
 *  ### Parámetros de entrada
 *  - [ `string` ] `name`: Nombre de la sección de grupo de rutas. Este nombre
 *  se renderiza como encabezado de los botones de grupos de rutas de la
 *  sección.
 *  - [ {@link IACele.Application.RouteGroup RouteGroup [ ]} ] `groups`: Matriz
 *  de grupos de rutas o rutas sencillas que se renderizan como un botón que
 *  despliega la rutas contenidas o redirección a la ruta individual.
 */ 
const RouteSection: React.FC<IACele.Application.RouteSection> = ({
    name,
    groups,
}) => {

    return (
        <div className="w-full h-min">
            <StickySectionTag>
                {name}
            </StickySectionTag>

            {/* Mapeo de grupos */}
            {
                groups.map(
                    (routeGroup, j) => (
                        <span key={j}>
                            <RouteGroup { ...routeGroup } />
                        </span>
                    )
                )
            }
        </div>
    );
};

export default RouteSection;
