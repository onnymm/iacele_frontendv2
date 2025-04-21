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
 *  - [ {@link IACele.API.Database.TableName T} ] `table`: Nombre de la tabla de base de datos para extraer
 *  los nombres de los campos.
 *  - [ {@link IACele.View.RecordInDatabase keyof Table} ] `columnKey`: Llave del campo de
 *  la tabla de base de datos a renderizar como columna.
 *  - [ {@link IACele.API.Database.Table RecordInDatabase} ] `record`: Registro de la base de datos
 *  del que se tomarán valores para renderizar un componente.
 *  - [ {@link IACele.View.Tree.ViewConfig ViewConfig} ] `viewConfig`: Configuración de vista de
 *  columnas de la tabla.
 */ 
const RenderCell = <T extends IACele.API.Database.TableName>({
    table,
    columnKey,
    record,
    viewConfig,
}: IACele.View.Tree.CellRender<T>) => {

    // Obtención de objeto de declaración de columna actual
    const columnConfig = viewConfig.find( (item) => (item.name === columnKey) ) as IACele.View.Tree.Field<T>;
    // Obtención del componente del objeto actual de declaración
    const component = viewConfig.find( (item) => (item.name === columnKey) )?.widget;

    // Si la declaración del widget es literal...
    if ( typeof component === 'string' ) {

        const widgetCallback = widgets[(component as keyof IACele.View.Widget.Presets<T>)]
        // Inicialización del widget
        const WidgetComponent = widgetCallback(
            columnConfig.name,
            columnConfig.colorDecoration ?? {},
            table,
            true,
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
        return getKeyValue(record, columnKey as string);
    };
};

export default RenderCell;

