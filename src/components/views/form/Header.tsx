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
const Header: React.FC<IACele.UI.GenericInvolverComponent> = ({
    children,
}) => {

    return (
        <div className="z-10 flex flex-wrap gap-2 h-min">
            {children}
        </div>
    );
};

export default Header;
