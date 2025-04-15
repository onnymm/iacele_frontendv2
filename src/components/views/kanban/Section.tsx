/** 
 *  ## Sección
 *  Este componente renderiza una sección que agrupa dos campos de manera
 *  horizontal para la declaración de vista de kanban.
 *  
 *  `< tsx >...</ tsx >` Contiene elementos hijos.
 *  
 *  ### Parámetros de entrada
 *  Este componente no requiere parámetros de entrada.
 */ 
const Section: React.FC<IACele.UI.GenericInvolverComponent> = ({
    children,
}) => {

    return (
        <div className="flex flex-row justify-between">
            {children}
        </div>
    );
};

export default Section;
