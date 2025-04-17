import Route from "./Route";

/** 
 *  ## Rutas
 *  Este componente renderiza un botón que redirecciona a una ruta o despliega
 *  una lista de rutas a las cuales el usuario puede navegar.
 *  
 *  ### Parámetros de entrada
 *  - [ `boolean` ] `isOpen`: Parámetro que indica que el botón está abierto.
 *  - [ `number` ] `height`: Altura computada para la lista de rutas cuando
 *  ésta se despliega.
 *  - [ {@link IACele.Application.Route Route [ ]} ] `routes`: Lista de rutas.
 *  - [ {@link React.RefObject RefObject} ]: `listRef`: Referencia usada para
 *  calcular la altura de la lista de rutas.
 *  - [ `function` ] `routeOnClick`: Función que se ejecuta cuando el
 *  componente un clic.
 */ 
const Routes: React.FC<IACele.Application.Routes> = ({
    isOpen,
    height,
    routes,
    listRef,
    routeOnClick,
}) => {

    return (
        <div
            id="sidebar-dropdown-button"
            style={{'height': isOpen && height ? height : 0}}
            className="flex flex-col gap-2 mx-8 px-4 overflow-y-hidden text-gray-300/70 transition-height duration-300"
        >
            <div ref={listRef} className="flex flex-col gap-2 py-2 w-full h-min">
                {
                    routes.map(
                        (route, i) => {
                            return (
                                <Route onClick={() => routeOnClick(route.path)} route={route} key={i} />
                            )
                        }
                    )
                }
            </div>
        </div>
    );
};

export default Routes;
