import { useCallback, useContext, useMemo } from "react";
import SortingFieldContext from "../../contexts/sortingFieldContext";
import { tableProperties } from "../../constants/views/names";

/** 
 *  ## Columna interactiva
 *  Este Custom Hook inicializa y crea todos los estados, funciones de cambio
 *  de estado y funciones personaizadas necesarias para el componente
 *  {@link InteractiveColumn}.
 */ 
const useInteractiveColumn = <K extends IACele.API.Database.TableName>(
    viewConfig: IACele.View.Tree.ViewConfig<K>,
    columnKey: keyof IACele.View.RecordInDatabase<K>,
    label: string | undefined,
    table: K,
) => {

    // Obtención de estados desde el contexto para ordenamiento de columnas
    const { sortingFieldKey, selectedSortingDirection, toggleSortingColumn } = useContext(SortingFieldContext);
    // Evaluación de si la columna está ordenando los datos actualmente
    const isSorting = sortingFieldKey === columnKey;

    // Definición de si el campo puede ordenar datos
    const isSorteable = useMemo(
        () => {

            // Obtención de los parámetros de la columna
            const columnParams = viewConfig.find( (item) => (item.name) === columnKey ) as IACele.View.Tree.Field<K>;

            // Retorno de si la columna puede ordenar datos
            return ( columnParams.canSort !== false );
        }, [columnKey, viewConfig]
    );

    // Función para ejecutar en clic
    const sortCallback = useCallback(
        () => {
            if ( !isSorteable ) return;

            toggleSortingColumn(columnKey as string);
        }, [isSorteable, toggleSortingColumn, columnKey]
    );

    // Leyenda computada
    const computedLabel = (
        label
            ? label
            : tableProperties[table as K][columnKey].name
    );

    return { sortingFieldKey, selectedSortingDirection, isSorting, isSorteable, sortCallback, computedLabel };
};

export default useInteractiveColumn;
