import { useMemo, useState } from "react"
import TreeView from "../../components/views/tree/TreeView"; // eslint-disable-line

/** 
 *  ## Columnas visibles
 *  Este Custom Hook crea los estados y funciones de cambio de estado para
 *  mostrar y ocultar columnas en el componente {@link TreeView}.
 *  
 *  ### Parámetros de entrada
 *  - [ {@link IACele.View.Tree.ViewConfig ViewConfig} ] `columns`:
 *  Configuración de columnas para vista de tabla.
 *  - [ {@link IACele.API.Database.TableName TableName} ] `table`: Nombre de la
 *  tabla de base de datos para extraer los nombres de los campos.
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
 *  @param viewConfig Configuración de columnas para vista de tabla.
 */ 
const useVisibleColumns = <K extends IACele.API.Database.TableName>(
    viewConfig: IACele.View.Tree.ViewConfig<K>,
): IACele.Hook.VisibleColumns<K> => {

    // Inicialización de columnas que se pueden ocultar y mostrar
    const toggleableColumns = useMemo(
        () => viewConfig.filter(
            (column) => ( column.visible !== undefined )
        ), [viewConfig]
    );

    // Inicialización de columnas visibles
    const [ visibleColumnsKeys, setVisibleColumnsKeys ] = useState<Set<keyof IACele.API.Database.Table[K]>>(
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
    const visibleColumns = (
        viewConfig
        .filter(
            (column) => (
                visibleColumnsKeys.has(column.name) || column.visible === undefined
            )
        )
    );

    return {
        visibleColumns,
        toggleableColumns,
        visibleColumnsKeys,
        setVisibleColumnsKeys: ( setVisibleColumnsKeys as IACele.UI.SelectOptions<K>['setSelectedKeys'] ),
    };
};

export default useVisibleColumns;
