import { getKeyValue } from "@heroui/react";
import widgets from "../../../widgets/Presets";
import Tree from "../Tree"; // eslint-disable-line

/** 
 *  ## Renderización dinámica de celda de tabla
 *  Este componente renderiza un componente dinámico en base a la configuración
 *  provista al componente {@link Tree}
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ {@link ViewConfig<API.DataTypes.GenericRecord>} ] `columns`:
 *  Configuración de columnas.
 *  - [ `string` ] `columnKey`: Llave de columna actual.
 *  - [ {@link API.DataTypes.GenericRecord} ] `record`: Objeto que contiene los
 *  datos de un registro de la base de datos.
 *  - [ {@link API.Database.TableName} ] `tableName`: Nombre de la tabla de
 *  donde se obtienen los datos.
 */ 
const RenderCell: React.FC<IACele.View.List.TableCell> = ({
    columns,
    columnKey,
    record,
    tableName,
}) => {

    // Obtención de objeto de declaración de columna actual
    const columnConfig = columns.find( (item) => (item.key === columnKey) ) as IACele.View.List._TableColumnConfig<IACele.API.DataTypes.GenericRecord>
    // Obtención del componente del objeto actual de declaración
    const component = columns.find( (item) => (item.key === columnKey) )?.component;

    // Si la declaración del widget es literal...
    if ( typeof component === 'string' ) {
        // Inicialización del widget
        const WidgetComponent = widgets[(component as IACele.Core.Widget.WidgetPresetKey)](
            columnConfig.key,
            columnConfig.options ? columnConfig.options : {},
            tableName,
            record,
        )
        // Retorno del widget renderizado
        return <WidgetComponent {...record} />;
    };

    // Si la declaración del widget es función...
    if ( typeof component === 'function' ) {
        // Inicialización del widget
        const WidgetComponent = component;
        // Retorno del widget renderizado
        return <WidgetComponent {...record} />;

    // Si no existe declaración del widget
    } else {
        // Se retorna el valor por sí mismo
        return getKeyValue(record, columnKey);
    };
};

export default RenderCell;
