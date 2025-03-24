
import { BrowserRouter } from "react-router";
import Router from "./router";
import { HeroUIProvider } from "@heroui/react";
import useDarkMode from "./hooks/app/useDarkMode";
import DarkModeContext from "./contexts/darkModeContext";
import { useState } from "react";
import NavbarContext from "./contexts/navbarContext";

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

    // Inicialización de valores para contexto
    const [ dynamicControls, setDynamicControls ] = useState<React.JSX.Element | null>(null);

    return (
        <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
            <HeroUIProvider>
                <NavbarContext.Provider value={{ dynamicControls, setDynamicControls }}>
                    <BrowserRouter>
                        <Router />
                    </BrowserRouter>
                </NavbarContext.Provider>
            </HeroUIProvider>
        </DarkModeContext.Provider>
    );
};

export default Root;
