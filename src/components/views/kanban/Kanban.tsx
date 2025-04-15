/** 
 *  ## Kanban
 *  Este componente renderiza la tarjeta base que envuelve campos y secciones
 *  para la vista declarativa de kanban.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  Este componente no requiere parámetros de entrada.
 */ 
const Kanban: React.FC<IACele.UI.GenericInvolverComponent> = ({
    children,
}) => {

    return (
        <div
            className="flex flex-col gap-2 bg-white hover:bg-slate-100 dark:bg-[#1f2f3f] shadow-md dark:hover:brightness-125 p-4 border border-gray-500/20 cursor-pointer"
        >
            {children}
        </div>
    );
};

export default Kanban;
