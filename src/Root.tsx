
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
import APIContext from "./contexts/apiContext";
import useSidebar from "./hooks/app/useSidebar";
import useAPI from "./hooks/app/useAPI";
import useBreadcrumbs from "./hooks/app/useBreadCrumbs";
import BreadcrumbsContext from "./contexts/breadcrumbsContext";

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
    // Inicialización de valores de apertura y bloqueo de barra lateral
    const { isSidebarOpen, setIsSidebarOpen, isSidebarLocked, setIsSidebarLocked } = useSidebar();
    // Inicialización de estado de carga e instancia de API
    const { appLoading, setAppLoading, api } = useAPI();
    // Inicialización de estados y funciones personalizadas para breadcrumbs
    const { recentRoutes, addRoute, cutRecent } = useBreadcrumbs();

    // Inicialización de valores para contexto
    const [ dynamicControls, setDynamicControls ] = useState<React.JSX.Element | null>(null);
    const [ pageName, setPageName ] = useState<string | null>(APP_NAME);

    return (
        <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
            <HeroUIProvider>
                <BreadcrumbsContext.Provider value={{ recentRoutes, addRoute, cutRecent }}>
                <NavbarContext.Provider value={{ dynamicControls, setDynamicControls }}>
                <APIContext.Provider value={{ appLoading, setAppLoading, api }}>
                <SidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen, isSidebarLocked, setIsSidebarLocked }}>
                <PageNameContext.Provider value={{ pageName, setPageName }}>
                    <BrowserRouter>
                        <Router />
                    </BrowserRouter>
                </PageNameContext.Provider>
                </SidebarContext.Provider>
                </APIContext.Provider>
                </NavbarContext.Provider>
                </BreadcrumbsContext.Provider>
            </HeroUIProvider>
        </DarkModeContext.Provider>
    );
};

export default Root;
