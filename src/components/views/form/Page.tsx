/** 
 *  ## Página de vista
 *  Este componente renderiza una página en donse se renderizará una vista de
 *  datos.
 *  
 *  `< tsx >...</ tsx >` Contiene elementos hijos.
 *  
 *  ### Parámetros de entrada
 *  Este componente no requiere parámetros de entrada.
 */  
const Page: React.FC<IACele.UI.GenericInvolverComponent> = ({
    children,
}) => {

    return (
        <div className="flex flex-col gap-2 w-full h-max min-h-full">
            {children}
        </div>
    );
};

export default Page;
