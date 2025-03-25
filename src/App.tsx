import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { TokenContext } from "./contexts/tokenContext";
import Navbar from "./components/common/navbar/Navbar";
import Sidebar from "./components/common/sidebar/Sidebar";

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

    // Obtención de valores del contexto
    const { token } = useContext<IACele.Context.Token>(TokenContext)
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

            {/* Barra lateral */}
            <Sidebar />
        </div>
    );
};

export default App;
