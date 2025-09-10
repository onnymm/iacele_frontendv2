import { useContext} from "react";
import Navbar from "./components/common/navbar/Navbar";
import Sidebar from "./components/common/sidebar/Sidebar";
import Content from "./Content";
import SidebarContext from "./contexts/sidebarContext";
import useRedirectToHome from "./hooks/app/useRedirectToHome";
import BreadcrumbsProvider from "./providers/BreadcrumbsProvider";

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

    // Obtención de estados desde el contexto
    const { isSidebarOpen, isSidebarLocked } = useContext(SidebarContext);
    // Uso de redireccionamiento cuando se establece un valor en el token
    useRedirectToHome();

    return (
        <BreadcrumbsProvider>
            <div className="relative flex flex-col h-full">
                {/* Barra superior */}
                <Navbar />

                {/* Contenido de la aplicación */}
                <div className={`${isSidebarOpen && isSidebarLocked ? "ui-navbar-active" : ""} h-[calc(100%_-_7rem)] group flex flex-row`}>
                    <div id="sidebar-block" className={`${isSidebarOpen && isSidebarLocked ? "w-[18rem]" : "w-0"} h-full transition-width duration-300`}/>
                    {/* Se contiene sólo esta parte para evitar renderizaciones innecesarias */}
                    <Content />
                </div>

                {/* Barra lateral */}
                <Sidebar />
            </div>
        </BreadcrumbsProvider>
    );
};

export default App;
