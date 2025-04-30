import React, { useContext } from "react";
import DarkModeSwitch from "../DarkModeSwitch";
import ButtonSidebarMenu from "./ButtonSidebarMenu";
import NavbarProfile from "./NavbarProfile";
import NavbarContext from "../../../contexts/navbarContext";
import ButtonNew from "./ButtonNew";
import Breadcrumb from "./Breadcrumb";
import Search from "./Search";
import MainControlsContext from "../../../contexts/mainControlsContext";
import SidebarContext from "../../../contexts/sidebarContext";
import Sizeable from "../Sizeable";

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
    const { mainControls } = useContext(MainControlsContext);
    // Obtención de valores desde el contexto
    const { isSidebarOpen, isSidebarLocked } = useContext(SidebarContext)

    return (
        <nav id="navbar" className="top-0 z-10 sticky flex flex-col gap-2 bg-white dark:bg-[#1f2f3f] shadow p-2 w-full min-h-16 transition select-none">

            <div id="navbar-header" className="flex flex-row justify-between items-center h-12">
                <div className="flex flex-row justify-between items-center px-4 sm:w-72 h-full">
                    <h1 id="navbar-logo" className="hidden sm:block">iaCele</h1>
                    <ButtonSidebarMenu />
                </div>
                <h1 id="navbar-logo" className="sm:hidden block">iaCele</h1>
                <div className="hidden lg:block w-[30%]">
                    <Search />
                </div>
                <div id="navbar-profile" className="flex flex-row justify-between gap-4 pr-4 sm:w-72 h-full">
                    <DarkModeSwitch />
                    <NavbarProfile />
                </div>
            </div>

            <Sizeable>
                {({ view }) => (
                    view === 'desktop'
                        ? (
                            <div id="navbar-controls" className="flex flex-row flex-shrink w-full">
                                <div className={`${isSidebarOpen && isSidebarLocked ? "w-72" : "w-0"} h-full transition-width duration-300`}/>
                                <div className="flex flex-row flex-grow justify-between h-10">
                                    <div className="flex flex-row items-center gap-1">
                                        <ButtonNew />
                                        {mainControls}
                                        <div className="lg:hidden flex flex-row items-center h-full">
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
                            </div>
                        )
                        : (
                            <div id="navbar-controls" className="flex flex-col flex-shrink gap-1 w-full">
                                <div className="flex flex-row flex-shrink">
                                    <div className={`${isSidebarOpen && isSidebarLocked ? "w-72" : "w-0"} h-full transition-width duration-300`}/>
                                    <div className="flex flex-row flex-grow justify-between h-10">
                                        <div className="flex flex-row items-center gap-1">
                                            <ButtonNew />
                                            <div className="lg:hidden flex flex-row items-center h-full">
                                                <Search />
                                            </div>
                                            <Breadcrumb />
                                        </div>
                                    </div>
                                </div>
                                {( mainControls || dynamicControls ) &&
                                    <div className="flex flex-row flex-shrink">
                                        <div className={`${isSidebarOpen && isSidebarLocked ? "w-72" : "w-0"} h-full transition-width duration-300`}/>
                                        <div className="flex flex-row flex-grow justify-between h-10">
                                            <div className="flex flex-row items-center gap-1">
                                                {mainControls}
                                            </div>
                                            <div className="flex flex-row justify-end items-center">
                                                {dynamicControls}
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        )
                )}
            </Sizeable>

        </nav>
    );
};

export default React.memo(Navbar);
