import { useCallback, useContext } from "react";
import SidebarContext from "../../../contexts/sidebarContext";
import { LockKeyhole } from "lucide-react";

/** 
 *  ## Bloqueo de barra lateral
 *  Este componente renderiza un botón que bloquea la barra lateral de la 
 *  interfaz base.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  Este componente no requiere parámetros de entrada.
 */ 
const ButtonLockSidebar = () => {

    // Obtención de estado y función de cambio de estado de bloqueo de barra lateral
    const { isSidebarLocked, setIsSidebarLocked } = useContext(SidebarContext);

    // Función que cambia el valor de la barra lateral bloqueada
    const toggleIsSidebarLocked = useCallback(
        () => {
            setIsSidebarLocked( (prev) => (!prev) );
        }, [setIsSidebarLocked]
    );

    return (
        <button
            onClick={toggleIsSidebarLocked}
            className={`${isSidebarLocked ? "bg-slate-900" : ""} hidden ui-interactive sm:block hover:bg-slate-900 rounded-md size-10`}
        >
            <div className="flex justify-center items-center p-2 size-full">
                <LockKeyhole className="sm:size-6 current-white" />
            </div>
        </button>
    );
};

export default ButtonLockSidebar;
