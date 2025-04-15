import useKanbanField from "../../../hooks/views/useKanbanField";
import FieldWrapper from "./FieldWrapper";

/** 
 *  ## Campo de Kanban
 *  Este componente renderiza un campo para la declaración de vista kanban.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ {@link IACele.View.RecordInDatabase keyof RecordInDatabase} ] `name`:
 *  Nombre en base de datos del campo de la tabla de base de datos a mostrar.
 *  - [ `string | boolean | undefined` ] `label`: Parámetro que indica la
 *  visibilidad del nombre del campo o que indica un nombre explícito de la
 *  columna en caso de querer reemplazar su nombre prestablecido.
 *  - [ `undefined` ] `widget`: Widget prestablecido o personalizado a usar
 *  para renderizar el valor del registro en una tabla de base de datos.
 *  - [ {@link IACele.View.Widget.Decoration Decoration} ] `colorDecoration`:
 *  Objeto de funciones que colorean un widget en base a los valores de un
 *  registro de base de datos.
 */ 
const Field = <K extends IACele.API.Database.TableName>({
    name,
    label,
    widget,
    colorDecoration = {},
}: IACele.View.Kanban.Field<K>) => {

    // Obtención de la leyenda computada y el componente renderizado
    const { computedLabel, component } = useKanbanField(name, label, widget, colorDecoration);

    return (
        <FieldWrapper label={computedLabel}>
            {component}
        </FieldWrapper>
    );
};

export default Field;