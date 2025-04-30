import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { TokenContext } from "./contexts/tokenContext";
import Navbar from "./components/common/navbar/Navbar";
import Sidebar from "./components/common/sidebar/Sidebar";
import Content from "./Content";
import SidebarContext from "./contexts/sidebarContext";
import NavbarContext from "./contexts/navbarContext";
import MainControlsContext from "./contexts/mainControlsContext";

/** 
 *  ## Aplicación de IACele
 *  Este componente renderiza la aplicación de IACele.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  Este componente no requiere parámetros de entrada.
 */ 
const App = (): (React.JSX.Element) => {

    // Obtención de valores de los contextos
    const navigate = useNavigate()
    const { token } = useContext(TokenContext)
    const { isSidebarOpen, isSidebarLocked } = useContext(SidebarContext)
    const { dynamicControls } = useContext(NavbarContext);
    const { mainControls } = useContext(MainControlsContext);

    useEffect(
        () => {
            if ( !token ) navigate('/login');
        }, [token, navigate]
    );

    return (
        <div className="relative h-full">
            {/* Barra superior */}
            <Navbar />

            {/* Contenido de la aplicación */}
            <div className={`${isSidebarOpen && isSidebarLocked ? "ui-navbar-active" : ""} ${(dynamicControls || mainControls) ? 'h-[calc(100%_-_9.75rem)]' : 'h-[calc(100%_-_7rem)]'} group flex flex-row flex-shrink h-[calc(100%_-_7rem)]`}>
                <div id="sidebar-block" className={`${isSidebarOpen && isSidebarLocked ? "w-72" : "w-0"} h-full transition-width duration-300`}/>
                {/* Se contiene sólo esta parte para evitar renderizaciones innecesarias */}
                <Content />
            </div>

            {/* Barra lateral */}
            <Sidebar />
        </div>
    );
};

export default App;
