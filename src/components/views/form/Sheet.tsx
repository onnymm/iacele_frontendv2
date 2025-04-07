/** 
 *  ## Hoja/cuerpo de vista
 *  Este componente renderiza el cuerpo de una vista de datos.
 *  
 *  `< tsx >...</ tsx >` Contiene elementos hijos.
 *  
 *  ### Parámetros de entrada
 *  Este componente no requiere parámetros de entrada.
 */ 
const Sheet: React.FC<IACele.UI.GenericInvolverComponent> = ({
    children,
}) => {

    return (
        <div className="flex-grow bg-white dark:bg-[#1f2f3f] shadow-md p-4 border border-gray-500/20 rounded-lg w-full min-w-screen h-full">
            <div className="gap-4 grid grid-cols-1 md:grid-cols-2 h-min">
                {children}
            </div>
        </div>
    );
};

export default Sheet;
