
import { BrowserRouter } from "react-router";
import Router from "./router";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import React from "react";
import DarkModeProvider from "./providers/DarkModeProvider";
import IACeleProvider from "./providers/IACeleProvider";

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

    return (
        <DarkModeProvider>
            <HeroUIProvider locale="es-MX" >
                <ToastProvider />
                <IACeleProvider>
                    <BrowserRouter>
                        <Router />
                    </BrowserRouter>
                </IACeleProvider>
            </HeroUIProvider>
        </DarkModeProvider>
    );
};

export default Root;
