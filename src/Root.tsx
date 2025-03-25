
import { BrowserRouter } from "react-router";
import Router from "./router";
import { HeroUIProvider } from "@heroui/react";
import useDarkMode from "./hooks/app/useDarkMode";
import DarkModeContext from "./contexts/darkModeContext";
import { useState } from "react";
import NavbarContext from "./contexts/navbarContext";
import SidebarContext from "./contexts/sidebarContext";

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
    const [ isSidebarOpen, setIsSidebarOpen ] = useState<boolean>(false);
    const [ isSidebarLocked, setIsSidebarLocked ] = useState<boolean>(false);

    return (
        <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
            <HeroUIProvider>
                <NavbarContext.Provider value={{ dynamicControls, setDynamicControls }}>
                <SidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen, isSidebarLocked, setIsSidebarLocked }}>
                    <BrowserRouter>
                        <Router />
                    </BrowserRouter>
                </SidebarContext.Provider>
                </NavbarContext.Provider>
            </HeroUIProvider>
        </DarkModeContext.Provider>
    );
};

export default Root;
