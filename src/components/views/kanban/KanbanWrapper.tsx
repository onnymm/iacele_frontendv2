import RecordKanbanContext from "../../../contexts/recordKanbanContext";
import TableContext from "../../../contexts/tableContext";
import Field from "./Field";
import Kanban from "./Kanban";
import Section from "./Section";

/** 
 *  ## Declaración de vista de kanban
 *  Este componente renderiza la vista de kanban, recibiendo una función flecha
 *  con la estructura a renderizar.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ {@link IACele.View.Kanban.ChildrenRenderer ChildrenRenderer} ]
 * `renderer`: Función utilizada para el encapsulamiento de componentes que se
 *  utilizan en la construcción de la vista de kanban.
 *  - [ {@link IACele.View.RecordInDatabase RecordInDatabase[ ] } ] `records`:
 *  En este estado se almacena la información obtenida desde el servidor.
 *  - [ {@link IACele.API.Database.TableName TableName} ] `table`: Nombre de
 *  tabla de base de datos.
 */ 
const KanbanWrapper = <K extends IACele.API.Database.TableName>({
    renderer,
    records,
    table,
}: IACele.View.Kanban.Wrapper<K>) => {

    return (
        <div className="flex flex-col gap-2 p-2">
            <TableContext.Provider value={{ table }}>
            {
                records.map(
                    (record, i) => (
                        <RecordKanbanContext.Provider key={i} value={{ record }}>
                            {renderer({ Kanban, Field: Field<K>, Section })}
                        </RecordKanbanContext.Provider>
                    )
                )
            }
            </TableContext.Provider>
        </div>
    );
};

export default KanbanWrapper;
