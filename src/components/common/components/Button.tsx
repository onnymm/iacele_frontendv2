import { SvgIconComponent } from "@mui/icons-material";
import React from "react";

interface BaseInterfaceButton {
    icon: React.FC<React.SVGProps<SVGElement>> | SvgIconComponent;
    callback: () => (void);
};

/** 
 *  ## Botón para barra lateral
 *  Este componente renderiza un botón para el encabezado de la barra lateral
 *  de la interfaz base.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ {@link SVGElement} ] `icon`: Ícono del botón.
 *  - [ `() => (void)` ] `callback`: Función a ejecutar.
 */ 
const Button: (config: BaseInterfaceButton) => (React.JSX.Element) = ({
    icon: Icon,
    callback,
}) => {

    return (
        <button onClick={callback} className="size-12">
            <div className="p-2 size-full">
                <Icon sx={{fontSize: 32}} className="text-white" />
            </div>
        </button>
    );
};

export default Button;
