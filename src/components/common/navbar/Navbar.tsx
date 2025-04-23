import React, { useContext } from "react";
import DarkModeSwitch from "../DarkModeSwitch";
import ButtonSidebarMenu from "./ButtonSidebarMenu";
import NavbarProfile from "./NavbarProfile";
import NavbarContext from "../../../contexts/navbarContext";
import ButtonNew from "./ButtonNew";
import Breadcrumb from "./Breadcrumb";
import Search from "./Search";

/** 
 *  ## Barra superior de interfaz base
 *  Este componente renderiza la barra superior de la interfaz de la aplicación.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  Este componente no requiere parámetros de entrada.
 */ 
const Navbar = (): (React.JSX.Element) => {

    // Obtención de estado para mostrar controles dinámicos en el centro de la barra de navegación
    const { dynamicControls } = useContext(NavbarContext);

    return (
        <nav id="navbar" className="top-0 z-10 sticky flex flex-col gap-2 bg-white dark:bg-[#1f2f3f] shadow p-2 w-full min-h-16 transition select-none">
            <div id="logo-menu" className="flex flex-row justify-between items-center h-12">
                <div className="flex flex-row justify-between items-center px-4 w-72 h-full">
                    <h1 id="navbar-logo" className="hidden sm:block">iaCele</h1>
                    <ButtonSidebarMenu />
                </div>
                <div className="hidden lg:block w-[30%]">
                    <Search />
                </div>
                <div id="navbar-controls" className="flex flex-row justify-between gap-4 pr-4 sm:w-72 h-full">
                    <DarkModeSwitch />
                    <NavbarProfile />
                </div>
            </div>
            <div className="flex flex-row justify-between h-10">
                <div className="flex flex-row items-center gap-2">
                    <ButtonNew />
                    <div className="lg:hidden">
                        <Search />
                    </div>
                    <Breadcrumb />
                </div>
                <div className="flex flex-row justify-end items-center gap-1">
                    {dynamicControls &&
                        <div className="flex flex-row justify-end items-center">{dynamicControls}</div>
                    }
                </div>
            </div>
        </nav>
    );
};

export default React.memo(Navbar);
