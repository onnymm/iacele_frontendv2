import { sidebarMenu } from "../../../settings/menu"
import RouteSection from "./RouteSection";

/** 
 *  ### Menú de barra lateral
 *  Este componente renderiza el menú de rutas principales a donde el usuario
 *  puede navegar.
 */ 
const SidebarMenu = () => {

    return (
        <div className="flex flex-col flex-grow gap-4 px-4">
            {
                sidebarMenu.map(
                    (section, i) => (
                        <RouteSection {...section} key={i} />
                    )
                )
            }
        </div>
    );
};

export default SidebarMenu;
