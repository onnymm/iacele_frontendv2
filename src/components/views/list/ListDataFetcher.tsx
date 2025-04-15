import { useCallback, useContext, useEffect, useState } from "react";
import useAPI from "../../../hooks/app/useAPI";
import useSortingFields from "../../../hooks/views/useSortingFields";
import useViewName from "../../../hooks/app/usePageName";
import NavbarContext from "../../../contexts/navbarContext";
import { TABLE_NAME } from "../../../constants/views/names";
import ToggleVisibleColumns from "../tree/components/ToggleVisibleColumns";
import useVisibleColumns from "../../../hooks/views/useVisibleColumns";
import Tree from "../tree/Tree";
import KanbanWrapper from "../kanban/KanbanWrapper";

/** 
 *  ## Obtención y renderización de lista de datos
 *  Este componente renderiza una vista que muestra varios registros de una
 *  tabla de la base de datos, ya sea en vista de árbol o kanban.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ {@link T} ] `table`: Nombre de la tabla de base de datos para extraer
 *  los nombres de los campos.
 *  - [ {@link IACele.View.Tree.ViewConfig} ] `viewConfig`: Configuración de
 *  vista de columnas de la tabla.
 *  - [ `string` ] `emptyContent`: Leyenda para mostrar cuando no existan datos
 *  a mostrar.
 */ 
const ListDataFetcher = <T extends IACele.API.Database.TableName>({
    table,
    viewConfig,
    emptyContent,
    kanban
}: IACele.View.Tree.KanbanRenderer<T>) => {

    // Obtención de función de contexto para colocar contenido JSX en la barra de navegación
    const { setDynamicControls } = useContext(NavbarContext);
    // Obtención de la función de cambio de estado para establecer el nombre de la vista
    const { setViewName } = useViewName();
    // Obtención de estados para visibilidad de columnas
    const { tableColumns, toggleableColumns, visibleColumns, setVisibleColumns } = useVisibleColumns(viewConfig, table);
    // Obtención de estados para ordenamiento de columnas
    const { sortingFieldKey, selectedSortingDirection, toggleSortingColumn } = useSortingFields<T>();
    // Obtención de instancia de API
    const { api } = useAPI();

    // Inicialización de estado de registros
    const [ records, setRecords ] = useState<IACele.View.RecordInDatabase<T>[]>([]);
    // Inicialización de estado de carga
    const [ loading, setLoading ] = useState<boolean>(true);

    // Función para mostrar los datos en la vista de tabla
    const fetchData = useCallback(
        async () => {
            // Obtención de los datos desde el backend
            const response = await api.getDataForTable<T>({
                table,
                sortby: sortingFieldKey ? sortingFieldKey : undefined,
                ascending: selectedSortingDirection.has('asc'),
            });

            // Se establecen los datos de los registros en el estado
            setRecords(response.data);
            // Se desactiva el estado de carga
            setLoading(false);
        }, [table, sortingFieldKey, selectedSortingDirection, api]
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

    useEffect(
        () => {
            // Se establece el contenido JSX en la barra de navegación
            setDynamicControls(
                <div className="flex flex-row justify-end w-full">
                    <ToggleVisibleColumns
                        toggleableKeys={toggleableColumns as IACele.UI.SelectOption[]}
                        selectedKeys={visibleColumns as Set<string>}
                        setSelectedKeys={setVisibleColumns}
                    />
                </div>
            );
            return ( () => setDynamicControls(null) );
        }, [setDynamicControls, setVisibleColumns, toggleableColumns, visibleColumns]
    );

    return (
        <div className="size-full">
            <div className="hidden sm:block h-full">
                <Tree<T>
                    emptyContent={emptyContent}
                    loading={loading}
                    records={records}
                    selectedSortingDirection={selectedSortingDirection}
                    sortingFieldKey={sortingFieldKey}
                    viewConfig={tableColumns}
                    table={table}
                    toggleSortingColumn={toggleSortingColumn}
                />
            </div>
            <div className="sm:hidden block h-full">
                <KanbanWrapper<T>
                    records={records}
                    renderer={kanban}
                    table={table}
                />
            </div>
        </div>
    );
};

export default ListDataFetcher;
