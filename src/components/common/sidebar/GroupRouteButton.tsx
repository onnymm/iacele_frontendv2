import { KeyboardArrowDownRounded } from "@mui/icons-material";

/** 
 *  ### Botón de grupo de rutas
 *  Este componente renderiza un botón que contiene una o más rutas para
 *  redireccionar en la aplicación cuando se da clic sobre éste o sus rutas
 *  contenidas, desplegables dando clic en éste.
 *  
 *  ### Parámetros de entrada
 *  - [ `string` ]: `string`: Nombre de grupo de rutas.
 *  - [ {@link React.ElementType ElementType} ] `icon`: Ícono descriptivo para
 *  representar la ruta.
 *  - [ {@link IACele.Application.Route string | Route [ ]} ]: `routes`: Matriz
 *  de rutas o ruta sencilla que lleva a alguna parte de la aplicación.
 *  - [ `boolean` ] `isOpen`: Parámetro que indica que el botón está abierto.
 *  - [ `function` ] `onClick`: Función que se ejecuta cuando se da clic en el
 *  componente que la recibe.
 *  - [ `boolean` ]: `isActiveLocation`: Este parámetro indica si la ubicación
 *  actual en la aplicación es la misma a la que el componente apunta.
 */ 
const GroupRouteButton: React.FC<IACele.Application.RouteGroupButton> = ({
    name,
    icon: Icon,
    routes,
    isOpen,
    onClick,
    isActiveLocation,
}) => {

    return (
        <button onClick={onClick} className={`${isActiveLocation ? "shadow-md active:shadow-md backdrop-saturate-115 backdrop-brightness-125" : ""} flex flex-row items-center gap-2 sm:hover:shadow-md active:shadow-md sm:hover:backdrop-saturate-115 sm:hover:backdrop-brightness-125 active:backdrop-saturate-115 active:backdrop-brightness-125 px-4 rounded-md w-full h-12 sm:h-10 transition`}>

            {/* Ícono de grupo de rutas */}
            <div className="flex justify-center items-center min-w-9 sm:min-w-7 h-9 sm:h-7">
                <Icon className="size-[75%] text-current" />
            </div>

            {/* Nombre del grupo */}
            <span className="flex-grow text-start">{name}</span>

            {/* Lista de rutas, en caso de haberla */}
            {typeof routes === 'object' &&
                <div className="flex justify-center items-center min-w-9 sm:min-w-7 h-9 sm:h-7">
                    <KeyboardArrowDownRounded className={`${isOpen ? 'rotate-180' : ''} duration-300 transition text-current size-[75%]`} />
                </div>
            }

        </button>
    );
};

export default GroupRouteButton;
