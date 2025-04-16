import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import useAPI from "../../../hooks/app/useAPI";
import useSortingFields from "../../../hooks/views/useSortingFields";
import useViewName from "../../../hooks/app/usePageName";
import NavbarContext from "../../../contexts/navbarContext";
import { TABLE_NAME, tableProperties } from "../../../constants/views/names";
import useVisibleColumns from "../../../hooks/views/useVisibleColumns";
import Tree from "../tree/Tree";
import KanbanWrapper from "../kanban/KanbanWrapper";
import Sizeable from "../../common/Sizeable";
import SelectTemplate from "../../ui/SelectTemplate";
import { Button } from "@heroui/react";
import { KeyboardArrowDownRounded, SwapVertRounded, TableViewRounded } from "@mui/icons-material";
import LABEL from "../../../constants/ui/list";

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

    // Configuración final de vista de campos
    const { processedViewConfig } = useProcessViewConfig(viewConfig, table);

    // Obtención de función de contexto para colocar contenido JSX en la barra de navegación
    const { setDynamicControls } = useContext(NavbarContext);
    // Obtención de la función de cambio de estado para establecer el nombre de la vista
    const { setViewName } = useViewName();
    // Obtención de estados para visibilidad de columnas
    const { tableColumns, toggleableColumns, visibleColumns, setVisibleColumns } = useVisibleColumns(processedViewConfig);
    // Obtención de estados para ordenamiento de columnas
    const { sortingField, selectedSortingDirection, setSelectedSortingDirection, setTreeSortingField, sorteableFields, toggleSortingColumn, treeSortingField } = useSortingFields<T>(processedViewConfig);
    // Obtención de instancia de API
    const { api } = useAPI();

    // Inicialización de estado de registros
    const [ records, setRecords ] = useState<IACele.View.RecordInDatabase<T>[]>([]);
    // Inicialización de estado de carga
    const [ loading, setLoading ] = useState<boolean>(true);

    // Función para mostrar los datos en la vista de tabla
    const fetchData = useCallback(
        async () => {
            // Se activa el estado de carga
            setLoading(true);
            // Obtención de los datos desde el backend
            const response = await api.getDataForTable<T>({
                table,
                sortby: sortingField ?? undefined,
                ascending: selectedSortingDirection.has('asc'),
            });

            // Se establecen los datos de los registros en el estado
            setRecords(response.data);
            // Se desactiva el estado de carga
            setLoading(false);
        }, [api, selectedSortingDirection, sortingField, table]
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
                <Sizeable>
                    {({ view }) => {
                        if ( view === 'desktop' ) {
                            return (
                                <SelectTemplate
                                    selectionMode="multiple"
                                    toggleableKeys={toggleableColumns as unknown as {name: T, label: string}[]}
                                    selectedKeys={visibleColumns as Set<string>}
                                    setSelectedKeys={setVisibleColumns}
                                    trigger={
                                        <Button
                                            size='sm'
                                            variant="solid"
                                            className="bg-transparent"
                                            startContent={<TableViewRounded className="outline-none" />}
                                            endContent={<KeyboardArrowDownRounded className="outline-none" />}
                                        >
                                            {LABEL.VISIBLE_COLUMNS}
                                        </Button>
                                    }
                                />
                            )
                        } else {
                            return (
                                <div className="flex flex-row gap-1">
                                    <SelectTemplate
                                        selectionMode="single"
                                        toggleableKeys={sorteableFields as unknown as {name: T, label: string}[]}
                                        selectedKeys={treeSortingField as Set<string>}
                                        setSelectedKeys={setTreeSortingField as (keys: IACele.UI._SharedSelection) => void}
                                        trigger={
                                            <Button
                                                size='sm'
                                                variant="solid"
                                                className="bg-transparent"
                                                isIconOnly
                                                startContent={<TableViewRounded className="outline-none" />}
                                            />
                                        }
                                    />
                                    <SelectTemplate
                                        selectionMode="single"
                                        toggleableKeys={[{name: 'asc', label: 'Acendente'}, {name: 'desc', label: 'Descendente'}]}
                                        selectedKeys={selectedSortingDirection}
                                        setSelectedKeys={setSelectedSortingDirection as (keys: IACele.UI._SharedSelection) => void}
                                        trigger={
                                            <Button
                                                size='sm'
                                                variant="solid"
                                                className="bg-transparent"
                                                isIconOnly
                                                startContent={<SwapVertRounded className="outline-none" />}
                                            />
                                        }
                                    />
                                </div>
                            )
                        }
                    }}
                </Sizeable>
            );
            return ( () => setDynamicControls(null) );
        }, [
            selectedSortingDirection,
            setDynamicControls,
            setSelectedSortingDirection,
            setTreeSortingField,
            setVisibleColumns,
            sorteableFields,
            toggleableColumns,
            treeSortingField,
            visibleColumns
        ]
    );

    return (
        <div className="size-full">
            <div className="hidden sm:block h-full">
                <Tree<T>
                    emptyContent={emptyContent}
                    loading={loading}
                    records={records}
                    table={table}
                    viewConfig={tableColumns}
                    selectedSortingDirection={selectedSortingDirection}
                    sortingFieldKey={sortingField}
                    toggleSortingColumn={toggleSortingColumn}
                />
            </div>
            <div className="sm:hidden block h-full">
                <KanbanWrapper<T>
                    records={records}
                    renderer={kanban}
                    table={table}
                    loading={loading}
                />
            </div>
        </div>
    );
};

export default ListDataFetcher;

const useProcessViewConfig = <K extends IACele.API.Database.TableName>(
    viewConfig: IACele.View.Tree.ViewConfig<K>,
    table: K,
) => {

    // Se completan todas las leyendas de la tabla
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

    return { processedViewConfig }
};
