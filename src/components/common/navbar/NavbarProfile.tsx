import { useContext } from "react";
import { UserContext } from "../../../contexts/userContext";
import { Avatar } from "@heroui/react";

/** 
 *  ## Sección de perfil en barra superior
 *  Este componente renderiza la sección del perfil del usuario que se
 *  visualiza en la barra superior de la interfaz base.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  Este componente no requiere parámetros de entrada.
 */ 
const NavbarProfile: () => (React.JSX.Element) = () => {

    // Obtención de los datos de perfil del usuario actual
    const currentUser = useContext(UserContext);

    return (
        <div id="navbar-profile" className="flex flex-row items-center gap-4 w-max h-full">
            <div className="hidden sm:block">
                <p className="justify-end font-semibold text-sm text-end">{currentUser.name}</p>
                <p className="text-gray-400 text-xs text-end">{currentUser.user}</p>
            </div>
            <Avatar src="cat.jpg" isBordered color="success" />
        </div>
    );
};

export default NavbarProfile;
