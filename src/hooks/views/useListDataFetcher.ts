import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { TABLE_NAME, tableProperties } from "../../constants/views/names";
import NavbarContext from "../../contexts/navbarContext";
import useViewName from "../app/usePageName";
import useVisibleColumns from "./useVisibleColumns";
import APIContext from "../../contexts/apiContext";
import usePagination from "./usePagination";
import useSortingFields from "./useSortingFields";
import ListDataFetcher from "../../components/views/list/ListDataFetcher"; // eslint-disable-line

/** 
 *  ## Obtención de datos
 *  Este Custom Hook crea los estados, funciones de cambio de estado, funciones
 *  personalizadas, función y ejecución de obtención de datos desde el backend
 *  así como la obtención de estados y funciones desde otros Custom Hooks más
 *  específicos, todo para el componente {@link ListDataFetcher}.
 */ 
const useListDataFetcher = <K extends IACele.API.Database.TableName>(
    table: K,
    viewConfig: IACele.View.Tree.ViewConfig<K>,
): IACele.Hook.ListDataFetcher<K> => {

    // Configuración final de vista de campos
    const processedViewConfig = useMemo(
        () => (
            viewConfig
            .map(
                (column) => {
                    column.label = (
                        // Si existe leyenda personalizada...
                        column.label !== undefined
                            // ...se conserva ésta
                            ? column.label
                            // ...se toma de los nombres prestablecidos
                            : tableProperties[table][column.name].name
                    );
                    return column;
                }
            )
        ), [viewConfig, table]
    );

    // Obtención de función de contexto para colocar contenido JSX en la barra de navegación
    const { setDynamicControls } = useContext(NavbarContext);
    // Obtención de la función de cambio de estado para establecer el nombre de la vista
    const { setViewName } = useViewName();
    // Obtención de estados para visibilidad de columnas
    const { visibleColumns, toggleableColumns, visibleColumnsKeys, setVisibleColumnsKeys } = useVisibleColumns(processedViewConfig);
    // Obtención de estados para ordenamiento de columnas
    const { sortingFieldKey, selectedSortingDirection, setSelectedSortingDirection, setKanbanSortingField, sorteableFields, toggleSortingColumn, kanbanSortingField } = useSortingFields<K>(processedViewConfig);
    // Obtención de instancia de API
    const { api } = useContext(APIContext);
    // Obtención de valores y funciones para uso en paginación
    const { count, setCount, itemsPerPage, currentPage, totalPages, prevPage, nextPage } = usePagination();

    // Inicialización de estado de registros
    const [ records, setRecords ] = useState<IACele.View.RecordInDatabase<K>[]>([]);
    // Inicialización de estado de carga
    const [ loading, setLoading ] = useState<boolean>(true);

    // Función para mostrar los datos en la vista de tabla
    const fetchData = useCallback(
        async () => {
            // Se activa el estado de carga
            setLoading(true);
            // Obtención de los datos desde el backend
            const response = await api.getDataForTable<K>({
                table,
                sortby: sortingFieldKey ?? undefined,
                ascending: selectedSortingDirection.has('asc'),
                page: currentPage - 1,
                itemsPerPage,
            });

            // Se establecen los datos de los registros en el estado
            setRecords(response.data);
            // Se establece la cantidad de conteo de registros
            setCount(response.count)
            // Se desactiva el estado de carga
            setLoading(false);
        }, [api, table, sortingFieldKey, selectedSortingDirection, currentPage, itemsPerPage, setCount]
    );

    // Ejecución de función para mostrar los datos
    useEffect(
        () => {
            fetchData();
        }, [fetchData]
    );

    useEffect(
        () => {
            // Se establece el nombre de la vista
            setViewName(TABLE_NAME[table]);
        }, [setViewName, table]
    );

    return {
        selectedSortingDirection,
        sortingFieldKey,
        toggleSortingColumn,
        count,
        currentPage,
        totalPages,
        prevPage,
        nextPage,
        loading,
        records,
        setDynamicControls,
        visibleColumns,
        toggleableColumns,
        visibleColumnsKeys,
        setVisibleColumnsKeys,
        sorteableFields,
        kanbanSortingField,
        setKanbanSortingField,
        setSelectedSortingDirection,
    };
};

export default useListDataFetcher;
