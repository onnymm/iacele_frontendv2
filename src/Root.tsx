
import { BrowserRouter } from "react-router";
import Router from "./router";
import { HeroUIProvider } from "@heroui/react";
import useDarkMode from "./hooks/app/useDarkMode";
import DarkModeContext from "./contexts/darkModeContext";

/** 
 *  ## Raíz de iaCele
 *  Este componente renderiza toda la estructura de iaCele
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  Este componente no requiere parámetros de entrada.
 */ 
const Root = (): (React.JSX.Element) => {

    // Obtención de valores para proveedor de contexto
    const { darkMode, setDarkMode } = useDarkMode();

    return (
        <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
            <HeroUIProvider>
                <BrowserRouter>
                    <Router />
                </BrowserRouter>
            </HeroUIProvider>
        </DarkModeContext.Provider>
    );
};

export default Root;
