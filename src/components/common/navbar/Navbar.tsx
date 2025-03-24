import { useContext } from "react";
import DarkModeSwitch from "../DarkModeSwitch";
import ButtonSidebarMenu from "./ButtonSidebarMenu";
import NavbarProfile from "./NavbarProfile";
import NavbarContext from "../../../contexts/navbarContext";

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
        <nav className="top-0 z-10 sticky flex flex-row justify-between items-center bg-white dark:bg-[#1f2f3f] shadow w-full h-16 transition select-none">
            <div className="flex flex-row justify-between items-center px-4 w-72 h-full">
                <h1 id="navbar-logo" className="hidden sm:block">iaCele</h1>
                <ButtonSidebarMenu />
            </div>
            {dynamicControls}
            <div id="navbar-controls" className="flex flex-row justify-between gap-4 pr-4 w-72 h-full">
                <DarkModeSwitch />
                <NavbarProfile />
            </div>
        </nav>
    )
}

export default Navbar;
