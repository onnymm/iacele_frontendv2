import { PanelLeftClose } from "lucide-react";
import { useContext } from "react";
import SidebarContext from "../../../contexts/sidebarContext";

/** 
 *  ## Botón para barra lateral
 *  Este componente renderiza un botón para el encabezado de la barra lateral
 *  de la interfaz base.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ {@link SVGElement} ] `icon`: Ícono del botón.
 *  - [ `function` ] `callback`: Función a ejecutar.
 */ 
const CloseSidebarButton = () => {

    // Obtención del estado de la barra lateral desde el contexto
    const { setIsSidebarOpen, isSidebarLocked } = useContext(SidebarContext);

    return (
        <button
            onClick={() => {setIsSidebarOpen(false)}}
            className="size-12 ui-interactive"
        >
            <div className={`${isSidebarLocked ? "opacity-0 pointer-events-none" : "opacity-100"} transition-opacity p-2 size-12`}>
                <PanelLeftClose strokeWidth={1} className="size-8 text-white" />
            </div>
        </button>
    );
};

export default CloseSidebarButton;
