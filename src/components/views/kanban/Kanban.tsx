import { useContext } from "react";
import useOpenRecord from "../../../hooks/views/useOpenRecord";
import RecordKanbanContext from "../../../contexts/recordKanbanContext";

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

    // Obtención de parámetros de redireccionamiento para abrir detalle de registro
    const { recordPath, openRecord } = useOpenRecord();
    // Obtención del registro para extraer su ID
    const { record } = useContext(RecordKanbanContext);

    return (
        <div
            onClick={() => openRecord(record.id)}
            className={`${recordPath ? 'hover:bg-slate-100 dark:hover:brightness-125 cursor-pointer' : ''} flex flex-col gap-2 bg-white dark:bg-[#1f2f3f] shadow-md p-4 border border-gray-500/20`}
        >
            {children}
        </div>
    );
};

export default Kanban;
