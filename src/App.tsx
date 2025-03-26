import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { TokenContext } from "./contexts/tokenContext";
import Navbar from "./components/common/navbar/Navbar";
import Sidebar from "./components/common/sidebar/Sidebar";
import Content from "./Content";
import SidebarContext from "./contexts/sidebarContext";

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
    const { token } = useContext(TokenContext)
    const { isSidebarOpen, isSidebarLocked } = useContext(SidebarContext)
    const navigate = useNavigate()

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
            <div className="flex flex-row flex-shrink h-[calc(100%_-_4rem)] max-h-[calc(100%_-_4rem)]">
                <div className={`${isSidebarOpen && isSidebarLocked ? "w-72" : "w-0"} h-full transition-width duration-300`}/>
                {/* Se contiene sólo esta parte para evitar renderizaciones innecesarias */}
                <Content />
            </div>

            {/* Barra lateral */}
            <Sidebar />
        </div>
    );
};

export default App;
