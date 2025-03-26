import { useContext } from "react";
import SidebarContext from "../../../contexts/sidebarContext";
import { LockOutlineRounded } from "@mui/icons-material";

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
const ButtonLockSidebar: () => (React.JSX.Element) = () => {

    // Obtención de estado y función de cambio de estado de bloqueo de barra lateral
    const { isSidebarLocked, setIsSidebarLocked } = useContext(SidebarContext);

    return (
        <button
            onClick={() => setIsSidebarLocked((prevState => !prevState))}
            className={`${isSidebarLocked ? "bg-slate-900" : ""} hidden sm:block hover:bg-slate-900 rounded-md size-10`}
        >
            <div className="p-2 size-full">
                <LockOutlineRounded className="fill-white sm:size-6" />
            </div>
        </button>
    );
};

export default ButtonLockSidebar;
