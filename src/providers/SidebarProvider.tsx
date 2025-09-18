import SidebarContext from "../contexts/sidebarContext";
import useSidebar from "../hooks/app/useSidebar";

const SidebarProvider: React.FC<IACele.Application.Provider> = ({
    children,
}) => {

    // Inicialización de valores de apertura y bloqueo de barra lateral
    const { isSidebarOpen, setIsSidebarOpen, isSidebarLocked, setIsSidebarLocked, toggleSidebar, sidebarRef } = useSidebar();

    return (
        <SidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen, isSidebarLocked, setIsSidebarLocked, toggleSidebar, sidebarRef }}>
            {children}
        </SidebarContext.Provider>
    );
};

export default SidebarProvider;
