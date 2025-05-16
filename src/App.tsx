import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { TokenContext } from "./contexts/tokenContext";
import Navbar from "./components/common/navbar/Navbar";
import Sidebar from "./components/common/sidebar/Sidebar";
import Content from "./Content";
import SidebarContext from "./contexts/sidebarContext";
import useRouteMemory from "./hooks/app/useRouteMemory";
import RouteMemoryContext from "./contexts/breadcrumbsContext";

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
    const navigate = useNavigate();
    const { token } = useContext(TokenContext);
    const { isSidebarOpen, isSidebarLocked } = useContext(SidebarContext);

    // Inicialización de estados y funciones personalizadas para breadcrumbs
    const { recentRoutes, addRoute, cutRecent, setRouteData, recoverData } = useRouteMemory();

    useEffect(
        () => {
            if ( !token ) navigate('/login');
        }, [token, navigate]
    );

    return (
        <RouteMemoryContext.Provider value={{ recentRoutes, addRoute, cutRecent, setRouteData, recoverData }}>
            <div className="relative flex flex-col h-full">
                {/* Barra superior */}
                <Navbar />

                {/* Contenido de la aplicación */}
                <div className={`${isSidebarOpen && isSidebarLocked ? "ui-navbar-active" : ""} flex-grow group flex flex-row`}>
                    <div id="sidebar-block" className={`${isSidebarOpen && isSidebarLocked ? "w-72" : "w-0"} h-full transition-width duration-300`}/>
                    {/* Se contiene sólo esta parte para evitar renderizaciones innecesarias */}
                    <Content />
                </div>

                {/* Barra lateral */}
                <Sidebar />
            </div>
        </RouteMemoryContext.Provider>
    );
};

export default App;
