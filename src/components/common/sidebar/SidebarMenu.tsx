import { sidebarMenu } from "../../../settings/menu"
import RouteSection from "./RouteSection";

/** 
 *  ### Menú de barra lateral
 *  Este componente renderiza el menú de rutas principales a donde el usuario
 *  puede navegar.
 */ 
const SidebarMenu = () => {

    return (
        <div className="flex flex-col gap-4 px-4 border h-full">
            {sidebarMenu.map(
                (section, index) => (
                    <RouteSection {...section} key={index} />
                )
            )}
        </div>
    );
};

export default SidebarMenu;
