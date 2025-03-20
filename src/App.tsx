import { Button } from "@heroui/react";
import { Outlet } from "react-router";

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
