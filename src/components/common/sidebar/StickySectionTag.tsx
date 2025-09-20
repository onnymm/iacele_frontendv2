/** 
 *  ## Etiqueta de sección de barra lateral
 *  Este componente renderiza una etiqueta de título para sección de grupos del
 *  menú de barra lateral.
 *  
 *  `< tsx >...</ tsx >` Contiene elementos hijos.
 *  
 *  ### Parámetros de entrada
 *  Este componente no requiere parámetros de entrada.
 */ 
const StickySectionTag: React.FC<GenericWrapperComponent> = ({
    children,
}) => {

    return (
        <div className="top-0 z-10 sticky flex items-center pb-1 pl-2 h-min select-none">
            <span className="font-medium text-gray-300/50 text-xs uppercase">
                {children}
            </span>
        </div>
    );
};

export default StickySectionTag;
