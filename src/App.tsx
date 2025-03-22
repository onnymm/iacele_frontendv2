import { Button } from "@heroui/react";
import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { TokenContext } from "./contexts/tokenContext";

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
        <div>
            <Button color="primary">
                Botón
            </Button>
            <Outlet />
        </div>
    );
};

export default App;
