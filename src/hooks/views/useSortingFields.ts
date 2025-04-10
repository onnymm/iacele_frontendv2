import { useCallback, useState } from "react";
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
const useSortingFields = <T extends IACele.API.Database.TableName>() => {

    // Inicialización de conjunto para estado de campo de ordenamiento
    const [ selectedSortingField, setSelectedSortingField ] = useState<Set<keyof IACele.API.Database.Table[T]>>(new Set([]));
    // Inicialización de dirección de ordenamiento
    const [ selectedSortingDirection, setSelectedSortingDirection ] = useState<Set<IACele.View._SortingDirectionValue>>(new Set(['asc']));
    // Inicialización de campo de ordenamiento
    const [ sortingFieldKey, setSortingFieldKey ] = useState<keyof IACele.API.Database.Table[T] | null>(null);

    // Función para establecer el campo de ordenamiento
    const toggleSortingColumn = useCallback(
        (key: keyof IACele.View.RecordInDatabase<T>) => {

            // Si el nuevo campo de ordenamiento es distinto al actual...
            if ( sortingFieldKey !== key ) {

                // Cambio de dirección de ordenamiento a ascendente
                if ( selectedSortingDirection.has('desc') ) setSelectedSortingDirection( new Set(['asc']) );
                // Se establece la llave de ordenamiento en el conjunto de llaves
                setSelectedSortingField(new Set([key]));
                // Se establece la llave de ordenamiento en el indicador
                setSortingFieldKey(key);

            // Si el nuevo campo de ordenamiento es igual al actual
            } else {

                // Se alterna solo la dirección de ordenamiento
                setSelectedSortingDirection(
                    selectedSortingDirection.has('asc')
                        ? new Set(['desc'])
                        : new Set(['asc'])
                );
            };
        }, [sortingFieldKey, selectedSortingDirection]
    );

    return {
        selectedSortingField,
        setSelectedSortingField,
        selectedSortingDirection,
        setSelectedSortingDirection,
        sortingFieldKey,
        toggleSortingColumn,
    };
};

export default useSortingFields;
