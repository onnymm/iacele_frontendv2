import React, { useContext } from "react";
import ButtonSidebarMenu from "./ButtonSidebarMenu";
import NavbarContext from "../../../contexts/navbarContext";
import Breadcrumb from "./breadcrumbs/Breadcrumb";
import Search from "./Search";
import MainControlsContext from "../../../contexts/mainControlsContext";
import SidebarContext from "../../../contexts/sidebarContext";
import Sizeable from "../Sizeable";
import { useNavigate } from "react-router";
import SuperiorControlsContext from "../../../contexts/superiorControls";
import { Button } from "@heroui/react";
import { EllipsisVertical } from "lucide-react";
import APP_NAME from "../../../constants/app/name";
import NavbarSettings from "./navbar_settings/NavbarSettings";

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

    // Obtención de estado para mostrar controles dinámicos en la barra de navegación
    const { superiorControls } = useContext(SuperiorControlsContext);
    // Obtención de función de navegación
    const navigate = useNavigate();

    return (
        <nav id="navbar" className="top-0 z-20 sticky flex flex-col gap-2 bg-white dark:bg-[#1f2f3f] shadow p-2 w-full transition select-none">

            <div id="navbar-header" className="flex flex-row justify-between items-start h-min min-h-12">
                <div className="flex flex-row justify-between items-center px-4 sm:w-72 h-12">
                    <h1 onClick={() => navigate('/')} id="navbar-logo" className="hidden sm:block cursor-pointer">{APP_NAME}</h1>
                    <ButtonSidebarMenu />
                </div>
                <h1 onClick={() => navigate('/')} id="navbar-logo" className="sm:hidden block cursor-pointer">{APP_NAME}</h1>
                <div className="hidden lg:flex flex-row items-center min-h-12">
                    {superiorControls}
                </div>
                <div id="navbar-profile" className="flex flex-row justify-between gap-4 pr-4 sm:w-72 h-12">
                    <NavbarSettings />
                </div>
            </div>

            <DynamicNavbar />

        </nav>
    );
};

export default React.memo(Navbar);

const DynamicNavbar = () => {

    // Obtención de estado para mostrar controles dinámicos en la barra de navegación
    const { dynamicControls } = useContext(NavbarContext);
    const { mainControls } = useContext(MainControlsContext);
    // Obtención de valores desde el contexto
    const { isSidebarOpen, isSidebarLocked } = useContext(SidebarContext);

    return (
        <Sizeable>
            {({ view }) => (
                view === 'desktop'
                    ? (
                        <div id="navbar-controls" className="flex flex-row flex-shrink w-full">
                            {/* Contenedor para reposicionar elementos cuando la barra lateral se abre y se bloquea */}
                            <div className={`${isSidebarOpen && isSidebarLocked ? "w-72" : "w-0"} h-full transition-width duration-300`}/>
                            <div className="flex flex-row flex-grow justify-between h-10">
                                <div className="flex flex-row items-center gap-1">
                                    {mainControls}
                                    <Search />
                                    <Breadcrumb />
                                </div>
                                <div className="flex flex-row justify-end items-center gap-1">
                                    <DynamicControls />
                                    <Options />
                                </div>
                            </div>
                        </div>
                    )
                    : (
                        <div id="navbar-controls" className="flex flex-col flex-shrink gap-1 w-full">
                            <div className="flex flex-row flex-shrink">
                                <div className={`${isSidebarOpen && isSidebarLocked ? "w-72" : "w-0"} h-full transition-width duration-300`}/>
                                <div className="flex flex-row flex-grow justify-between h-10">
                                    <div className="flex flex-row flex-grow justify-between h-10">
                                        <Search />
                                        <Options />
                                    </div>
                                </div>
                            </div>
                            {( mainControls || dynamicControls ) &&
                                <div className="flex flex-row flex-shrink">
                                    <div className={`${isSidebarOpen && isSidebarLocked ? "w-72" : "w-0"} h-full transition-width duration-300`}/>
                                    <div className="flex flex-row items-center gap-1">
                                        <div className="flex flex-row items-center gap-1">
                                            {mainControls}
                                        </div>
                                        <Breadcrumb />
                                        <DynamicControls />
                                    </div>
                                </div>
                            }
                        </div>
                    )
            )}
        </Sizeable>
    );
};

const Options = () => {

    return (
        <Sizeable>
            {({ componentSize }) => (
                <Button
                    isIconOnly
                    variant='solid'
                    size={componentSize}
                    onPress={() => {}}
                >
                    <EllipsisVertical />
                </Button>
            )}
        </Sizeable>
    );
};

const DynamicControls = () => {

    // Obtención de estado para mostrar controles dinámicos en la barra de navegación
    const { dynamicControls } = useContext(NavbarContext);

    // Si no existe ningún componente dentro de los controles dinámicos se termina la ejecución
    if ( !dynamicControls ) return;

    return (
        <div className="flex flex-row justify-end items-center">
            {dynamicControls}
        </div>
    );
};
