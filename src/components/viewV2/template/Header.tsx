/** 
 *  ## Encabezado de vista
 *  Este componente renderiza una sección de encabezado para colocar botones
 *  que realizan funciones personalizadas.
 *  
 *  `< tsx >...</ tsx >` Contiene elementos hijos.
 *  
 *  ### Parámetros de entrada
 *  Este componente no requiere parámetros de entrada.
 */  
const Header: React.FC<GenericWrapperComponent> = ({
    children,
}) => {

    return (
        <div className="group z-0 flex flex-wrap gap-2 h-min ui-form-header stick">
            {children}
        </div>
    );
};

export default Header;
