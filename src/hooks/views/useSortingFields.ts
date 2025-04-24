import { useCallback, useEffect, useMemo, useState } from "react";
import Tree from "../../components/views/tree/Tree"; // eslint-disable-line
/** 
 *  ## Campos de ordenamiento
 *  Este Custom Hook crea los estados y funciones de cambio de estado para
 *  establecer y renderizar el campo de ordenamiento en el componente
 *  {@link Tree}.
 *  
 *  ### Retorno
 *  Este Custom Hook retorna:
 *  - [ {@link Set<string>} ] `selectedSortingField`: Conjunto que contiene el
 *  campo de ordenamiento.
 *  - [ {@link React.Dispatch<React.SetStateAction<Set<string>>>} ]
 *  `setSelectedSortingField`: Función de cambio de estado de conjunto que
 *  contiene el campo de ordenamiento.
 *  - [ {@link Set<IACele.View.SortingDirectionValue>} ]
 *  `selectedSortingDirection`: Conjunto que contiene la dirección de
 *  ordenamiento.
 *  - [ {@link React.Dispatchs<React.SetStateAction<Set<IACele.View.SortingDirectionValue>>>} ]
 * `setSelectedSortingDirection`: Función de cambio de estado de conjunto que
 *  contiene la dirección de ordenamiento.
 *  - [ `string | null` ] `sortingFieldKey`: Indicador de columna de
 *  ordenamiento.
 *  - [ `undefined` ] `toggleSortingColumn`: Función para establecer el campo
 *  de ordenamiento.
 */ 
const useSortingFields = <K extends IACele.API.Database.TableName>(
    viewConfig: IACele.View.Tree.ViewConfig<K>,
): IACele.Hook.SortingFields<K> => {

    // Se obtienen los únicos campos que pueden usarse para ordenar datos
    const sorteableFields = useMemo(
        () => (
            viewConfig
            .filter(
                (config) => (config.canSort !== false)
            )
        ), [viewConfig]
    );

    // Inicialización de columna seleccionada para ordenamiento
    const [ sortingFieldKey, setSortingField ] = useState<keyof IACele.View.RecordInDatabase<K> | null>(null);

    // Inicialización de llave de campo de ordenamiento de datos actual
    const [ kanbanSortingField, setKanbanSortingField ] = useState<Set<keyof IACele.View.RecordInDatabase<K>>>(new Set([]));

    // Inicialización de dirección de ordenamiento
    const [ selectedSortingDirection, setSelectedSortingDirection ] = useState<Set<IACele.View._SortingDirectionValue>>(new Set(['asc']));

    // Función para establecer campo de ordenamiento en vista de árbol
    const toggleSortingColumn = useCallback(
        (key: keyof IACele.View.RecordInDatabase<K>) => {

            // Si el nuevo campo de ordenamiento es distinto al actual...
            if ( sortingFieldKey !== key ) {

                // Cambio de dirección de ordenamiento a ascendente
                if ( selectedSortingDirection.has('desc') ) setSelectedSortingDirection( new Set(['asc']) );
                // Se establece la llave de ordenamiento en el conjunto de llaves
                setKanbanSortingField(new Set([key]));
                // Se establece la llave de ordenamiento en el indicador
                setSortingField(key);

            // Si el nuevo campo de ordenamiento es igual al actual
            } else {

                // Se alterna solo la dirección de ordenamiento
                setSelectedSortingDirection(
                    selectedSortingDirection.has('asc')
                        ? new Set(['desc'])
                        : new Set(['asc'])
                );
            };
        }, [selectedSortingDirection, sortingFieldKey]
    );

    useEffect(
        () => {
            const values = new Array( ...kanbanSortingField.values() );

            if ( values.length ) {
                const [ newKey ] = values;
                setSortingField(newKey);
            };
        }, [kanbanSortingField]
    );

    return {
        sortingFieldKey,
        selectedSortingDirection,
        toggleSortingColumn,
        sorteableFields,
        kanbanSortingField,
        setKanbanSortingField,
        setSelectedSortingDirection,
    };
};

export default useSortingFields;
