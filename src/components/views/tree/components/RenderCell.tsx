import { getKeyValue } from "@heroui/react";
import widgets from "../../../widgets/Presets";

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
