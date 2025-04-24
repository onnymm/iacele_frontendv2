import { useContext, useMemo } from "react";
import RecordKanbanContext from "../../contexts/recordKanbanContext";
import { tableProperties } from "../../constants/views/names";
import RenderedWidget from "../../components/views/kanban/RenderedWidget";
import TableContext from "../../contexts/tableContext";

/** 
 *  ## Campo de kanban
 *  Este Custom Hook computa la leyenda y el componente final a renderizar
 *  para la vista de kanban.
 *  
 *  `< tsx >...</ tsx >` Contiene elementos hijos.
 *  
 *  ### Parámetros de entrada
 *  - [ {@link IACele.View.RecordInDatabase RecordInDatabase} ] `name`: Nombre
 *  en base de datos del campo de la tabla de base de datos a mostrar.
 *  - [ `string | boolean | undefined` ] `label`: Parámetro que indica la
 *  visibilidad del nombre del campo o que indica un nombre explícito de la
 *  columna en caso de querer reemplazar su nombre prestablecido.
 *  - [ `undefined` ] `widget`: Widget prestablecido o personalizado a usar
 *  para renderizar el valor del registro en una tabla de base de datos.
 *  - [ {@link IACele.View.Widget.Decoration Decoration} ] `colorDecoration`:
 *  Objeto de funciones que colorean un widget en base a los valores de un
 *  registro de base de datos.
 *  
 *  ### Retorno
 *  Este Custom Hook retorna:
 *  - [ `string` ] `computedLabel`: Leyenda computada que contiene el nombre
 *  del campo.
 *  - [ {@link React.ReactNode ReactNode} ] `React.ReactNode`: Widget final
 *  renderizado.
 */ 
const useKanbanField = <K extends IACele.API.Database.TableName>(
    name: keyof IACele.View.RecordInDatabase<K>,
    label: string | boolean | undefined,
    widget: keyof IACele.View.Widget.Presets<K> | ((props: IACele.View.RecordInDatabase<K>) => (React.ReactNode)) | undefined,
    colorDecoration: IACele.View.Widget.Decoration<K>,
) => {

    // Obtención de los datos del registro desde el contexto
    const { record } = useContext(RecordKanbanContext) as { record: IACele.View.RecordInDatabase<K> };
    // Obtención del nombre de la tabla
    const { table } = useContext(TableContext) as IACele.View._TableUse<K>;

    // Se computa la leyenda a renderizar en base al valor provisto
    const computedLabel = useMemo(
        () => (
            label
                ? (
                    // Si el valor entrante es booleano (y es [true])
                    typeof label === 'boolean'
                        // Se utiliza el nombre predeterminado del campo
                        ? tableProperties[table][name as keyof IACele.View.RecordInDatabase<K>].name
                        // Se utiliza el valor como tipo cadena de texto
                        : label
                // Se añade un separador en texto
                ) + ': '
                : ''
        ), [label, name, table]
    );

    // Ejecución del componente dinámico para generar el contenido TSX a usar
    const component = RenderedWidget({ name, widget, colorDecoration, record, table }) as React.ReactNode;

    return { computedLabel, component };
};

export default useKanbanField;
