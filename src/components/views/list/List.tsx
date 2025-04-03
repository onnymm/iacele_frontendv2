import { useCallback, useContext, useEffect, useState } from "react";
import NavbarContext from "../../../contexts/navbarContext";
import useViewName from "../../../hooks/app/usePageName";
import useVisibleColumns from "../../../hooks/views/useVisibleColumns";
import useSortingFields from "../../../hooks/views/useSortingFields";
import api from "../../../api/api";
import TABLE_NAME from "../../../constants/views/names";
import Tree from "../tree/Tree";
import ToggleVisibleColumns from "../tree/components/ToggleVisibleColumns";

const List: IACele.View.List.Params = ({
    tableName,
    viewConfig,
    emptyContent,
}) => {

    // Obtención de función de contexto para colocar contenido JSX en la barra de navegación
    const { setDynamicControls } = useContext(NavbarContext);
    // Obtención de la función de cambio de estado para establecer el nombre de la vista
    const { setViewName } = useViewName();
    // Obtención de estados para visibilidad de columnas
    const { tableColumns, toggleableColumns, visibleColumns, setVisibleColumns } = useVisibleColumns(viewConfig as IACele.View.List.ViewConfig<IACele.API.DataTypes.GenericRecord>);
    // Obtención de estados para ordenamiento de columnas
    const { sortingFieldKey, selectedSortingDirection, toggleSortingColumn } = useSortingFields();

    // Inicialización de estado de registros
    const [ records, setRecords ] = useState<IACele.API.DataTypes.GenericRecord[]>([]);
    // Inicialización de estado de carga
    const [ loading, setLoading ] = useState<boolean>(true);

    // Función para mostrar los datos en la vista de tabla
    const fetchData = useCallback(
        async () => {
            // Obtención de los datos desde el backend
            const response = await api.getDataForTable({
                tableName,
                sortby: sortingFieldKey ? sortingFieldKey : undefined,
                ascending: selectedSortingDirection.has('asc'),
            });

            // Se establecen los datos de los registros en el estado
            setRecords(response.data);
            // Se desactiva el estado de carga
            setLoading(false);
        }, [tableName, sortingFieldKey, selectedSortingDirection]
    );

    useEffect(
        () => {
            // Se establece el nombre de la vista
            setViewName(TABLE_NAME[tableName]);
        }, [setViewName, tableName]
    );

    // Ejecución de función para mostrar los datos
    useEffect(
        () => {
            fetchData();
        }, [fetchData]
    );

    useEffect(
        () => {
            // Se establece el contenido JSX en la barra de navegación
            setDynamicControls(
                <div className="flex flex-row justify-end w-full">
                    <ToggleVisibleColumns
                        toggleableKeys={toggleableColumns}
                        selectedKeys={visibleColumns}
                        setSelectedKeys={setVisibleColumns}
                    />
                </div>
            );
            return ( () => setDynamicControls(null) );
        }, [setDynamicControls, setVisibleColumns, toggleableColumns, visibleColumns]
    );

    return (
        <div className="hidden sm:block h-full">
            <Tree
                emptyContent={emptyContent}
                loading={loading}
                records={records}
                selectedSortingDirection={selectedSortingDirection}
                sortingFieldKey={sortingFieldKey}
                tableColumns={tableColumns}
                tableName={tableName}
                toggleSortingColumn={toggleSortingColumn}
            />
        </div>
    );
};

export default List;
