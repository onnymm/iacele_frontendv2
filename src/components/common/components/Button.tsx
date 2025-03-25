import React from "react";

interface BaseInterfaceButton {
    icon: React.FC<React.SVGProps<SVGElement>>;
    callback: () => (void);
}

/** 
 *  ## Botón para barra lateral
 *  Este componente renderiza un botón para el encabezado de la barra lateral
 *  de la interfaz base.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ {@link IconType} ] `icon`: Ícono del botón.
 *  - [ `() => (void)` ] `callback`: Función a ejecutar.
 */ 
const Button: (config: BaseInterfaceButton) => (React.JSX.Element) = ({
    icon: Icon,
    callback,
}) => {

    return (
        <button onClick={callback} className="size-12">
            <div className="p-2 size-full">
                <Icon className="fill-white size-8" />
            </div>
        </button>
    );
};

export default Button;
