import { useCallback, useContext, useRef } from "react"
import SidebarContext from "../../../contexts/sidebarContext";
import useClickOutside from "../../../hooks/app/useClickOutside";
import ButtonLockSidebar from "./ButtonLockSidebar";
import Button from "../components/Button";
import IconKeyboardArrowLeft from "../../icons/IconKeyboardArrowLeft";

const Sidebar = (): (React.JSX.Element) => {

    //Inicilización de referencia para la barra lateral
    const sidebarRef = useRef<HTMLElement>(null);

    // Obtención del estado de la barra lateral desde el contexto
    const { isSidebarOpen, setIsSidebarOpen, isSidebarLocked, setIsSidebarLocked } = useContext(SidebarContext);

    // Función para cerrar la barra lateral cuando se hace un clic por fuera y ésta está desbloqueada
    const handleClickOutside = useCallback(
        () => {
            // Si la barra lateral no está bloqueada
            if ( !isSidebarLocked ) {
                setIsSidebarOpen(false);
                setIsSidebarLocked(false);
            }
        }, [isSidebarLocked, setIsSidebarOpen, setIsSidebarLocked]
    );

    // Uso de hook para desencadenar efecto de clic fuera
    useClickOutside(sidebarRef, handleClickOutside);

    return (
        <div id="sidebar-action" className="top-0 z-50 absolute size-full pointer-events-none">
            <aside ref={sidebarRef} className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-[72rem]'} bg-[#162230] top-0 flex flex-col gap-2 absolute w-72 pointer-events-auto transition duration-300 pb-4 h-full`}>
                <div className="flex sm:flex-row flex-row-reverse justify-between items-center px-4 w-72 h-20">
                    <h1 id="navbar-logo" className="flex justify-center items-center size-full">iaCele</h1>
                    <div className={`${isSidebarLocked ? "opacity-0 pointer-events-none" : "opacity-100"} transition-opacity size-12`}>
                        <Button icon={IconKeyboardArrowLeft} callback={() => setIsSidebarOpen(false)} />
                    </div>
                </div>
                <div id="sidebar-content" className="h-full">
                    
                </div>

                {/* Pie de barra lateral */}
                <div className="flex justify-end px-4 h-10">
                    <ButtonLockSidebar />
                </div>
            </aside>
        </div>
    );
};

export default Sidebar;
