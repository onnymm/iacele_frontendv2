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
const StickySectionTag: React.FC<IACele.UI.GenericInvolverComponent> = ({
    children,
}) => {

    return (
        <div className="top-0 z-10 sticky mb-2 select-none">
            <span className="py-2 font-medium text-gray-300/50 text-sm uppercase">
                {children}
            </span>
        </div>
    );
};

export default StickySectionTag;
