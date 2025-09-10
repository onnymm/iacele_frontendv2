import { useRef } from "react";
import AppContentContext from "./contexts/appContentContext";
import { Outlet } from "react-router";

/** 
 *  ## Contenido de aplicación
 *  Este componente renderiza todo el contenido de la aplicación.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  Este componente no requiere parámetros de entrada.
 */ 
const Content: () => (React.JSX.Element) = () => {

    // Referencia del contenido de la app
    const appContentRef = useRef<HTMLElement>(null);

    return (
        <AppContentContext.Provider value={{ appContentRef }}>
            <main id="app-content" ref={appContentRef} className="flex bg-slate-100 dark:bg-[#101b26] w-full group-[.ui-navbar-active]:w-[calc(100%_-_18rem)] overflow-y-auto transition-width duration-300">
                <Outlet />
            </main>
        </AppContentContext.Provider>
    );
};

export default Content;
