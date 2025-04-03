import { SharedSelection } from "@heroui/react"
import { useMemo, useState } from "react"
import Tree from "../../components/views/tree/Tree" // eslint-disable-line

/** 
 *  ## Columnas visibles
 *  Este Custom Hook crea los estados y funciones de cambio de estado para
 *  mostrar y ocultar columnas en el componente {@link Tree}.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ {@link
 *  IACele.View.List._TableColumnConfig<IACele.API.DataTypes.GenericRecord>[]}
 *  ] `tableColumns`: Columnas visibles filtradas.
 *  - [ {@link
 *  IACele.View.List._TableColumnConfig<IACele.API.DataTypes.GenericRecord>} ]
 *  `toggleableColumns`: Columnas ocultables/mostrables.
 *  - [ {@link Set<string>} ] `visibleColumns`: Conjunto de llaves de columnas
 *  visibles.
 *  - [ `undefined` ] `setVisibleColumns`: Función de cambio de estado de
 *  conjunto de llaves de columnas visibles.
 */ 
const useVisibleColumns = (
    columns: IACele.View.List.ViewConfig<IACele.API.DataTypes.GenericRecord>
) => {

    // Inicialización de columnas que se pueden ocultar y mostrar
    const toggleableColumns = useMemo(
        () => columns.filter(
            (column) => ( column.visible !== undefined )
        ), [columns]
    )

    // Inicialización de columnas visibles
    const [ visibleColumns, setVisibleColumns ] = useState<Set<string>>(
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
                    (column) => (column.key)
                )
            )
        )
    );

    // Arreglo de objetos iterables por el componente de tabla, filtrado solo por columnas visibles
    const tableColumns = (
        columns
        .filter(
            (column) => (
                visibleColumns.has(column.key as string) || column.visible === undefined
            )
        )
    );

    return {
        tableColumns,
        toggleableColumns,
        visibleColumns,
        setVisibleColumns: (setVisibleColumns as (keys: SharedSelection) => void)
    };
}

export default useVisibleColumns;
