import { SharedSelection } from "@heroui/react"
import { useMemo, useState } from "react"
import { tableProperties } from "../../constants/views/names";
import TreeView from "../../components/views/tree/TreeView"; // eslint-disable-line

/** 
 *  ## Columnas visibles
 *  Este Custom Hook crea los estados y funciones de cambio de estado para
 *  mostrar y ocultar columnas en el componente {@link TreeView}.
 *  
 *  ### Parámetros de entrada
 *  - [ {@link IACele.View.Tree.ViewConfig ViewConfig} ] `columns`:
 *  Configuración de
 *  columnas para vista de tabla.
 *  - [ {@link IACele.API.Database.TableName T} ] `table`: Nombre de la tabla
 *  de base de datos para extraer los nombres de los campos.
 *  
 *  ### Retorno
 *  Este Custom Hook retorna:
 *  - [ {@link IACele.View.Tree.ViewConfig ViewConfig} ] `tableColumns`:
 *  Arreglo de objetos iterables por el componente de tabla, filtrado solo por
 *  columnas visibles.
 *  - [ {@link IACele.View.Tree.ViewConfig ViewConfig} ] `toggleableColumns`:
 *  Arreglo de columnas que se pueden ocultar y mostrar.
 *  - [ {@link IACele.API.Database.TableName keyof RecordInDatabase} ]
 *  `visibleColumns`: Columnas visibles.
 *  - [ `function` ]: `setVisibleColumns`: Función para manejar los cambios de
 *  columnas visibles.
 *  
 *  @param columns Configuración de columnas para vista de tabla.
 *  @param table Nombre de la tabla de base de datos para extraer los nombres
 *  de los campos.
 */ 
const useVisibleColumns = <T extends IACele.API.Database.TableName>(
    columns: IACele.View.Tree.ViewConfig<T>,
    table: T,
) => {

    // Inicialización de columnas que se pueden ocultar y mostrar
    const toggleableColumns = useMemo(
        () => columns.filter(
            (column) => ( column.visible !== undefined )
        ), [columns]
    )

    // Inicialización de columnas visibles
    const [ visibleColumns, setVisibleColumns ] = useState<Set<keyof IACele.API.Database.Table[T]>>(
        () => (
            // Inicialización de un conjunto
            new Set(
                toggleableColumns
                .filter(
                    // Se conservan inicialmente solo las que deben aparecer visibles en la primera renderización
                    (column) => (column.visible === true)
                )
                .map(
                    // Extracción de su llave
                    (column) => (column.name)
                )
            )
        )
    );

    // Arreglo de objetos iterables por el componente de tabla, filtrado solo por columnas visibles
    const tableColumns = (
        columns
        .filter(
            (column) => (
                visibleColumns.has(column.name) || column.visible === undefined
            )
        )
        .map(
            (column) => {
                column.label = (
                    column.label !== undefined
                        ? column.label
                        : tableProperties[table][column.name].name
                );

                return column;
            }
        )
    );

    return {
        tableColumns,
        toggleableColumns,
        visibleColumns,
        setVisibleColumns: (setVisibleColumns as (keys: SharedSelection) => void)
    };
};

export default useVisibleColumns;
