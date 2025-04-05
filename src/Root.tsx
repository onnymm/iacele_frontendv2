
import { BrowserRouter } from "react-router";
import Router from "./router";
import { HeroUIProvider } from "@heroui/react";
import useDarkMode from "./hooks/app/useDarkMode";
import DarkModeContext from "./contexts/darkModeContext";
import { useState } from "react";
import NavbarContext from "./contexts/navbarContext";
import SidebarContext from "./contexts/sidebarContext";
import PageNameContext from "./contexts/pageNameContext";
import APP_NAME from "./constants/app/name";
import AppLoadingContext from "./contexts/appLoadingContext";

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
    const [ pageName, setPageName ] = useState<string | null>(APP_NAME);
    const [ appLoading, setAppLoading ] = useState<boolean>(false);

    return (
        <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
            <HeroUIProvider>
                <NavbarContext.Provider value={{ dynamicControls, setDynamicControls }}>
                <AppLoadingContext.Provider value={{ appLoading, setAppLoading }}>
                <SidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen, isSidebarLocked, setIsSidebarLocked }}>
                <PageNameContext.Provider value={{ pageName, setPageName }}>
                    <BrowserRouter>
                        <Router />
                    </BrowserRouter>
                </PageNameContext.Provider>
                </SidebarContext.Provider>
                </AppLoadingContext.Provider>
                </NavbarContext.Provider>
            </HeroUIProvider>
        </DarkModeContext.Provider>
    );
};

export default Root;
