import { useEffect } from "react";
import Tree from "../tree/Tree";
import KanbanWrapper from "../kanban/KanbanWrapper";
import Sizeable from "../../common/Sizeable";
import SelectTemplate from "../../ui/SelectTemplate";
import { Button } from "@heroui/react";
import { KeyboardArrowDownRounded, SwapVertRounded, TableViewRounded } from "@mui/icons-material";
import LABEL from "../../../constants/ui/list";
import Pagination from "./Pagination";
import useListDataFetcher from "../../../hooks/views/useListDataFetcher";

/** 
 *  ## Obtención y renderización de lista de datos
 *  Este componente renderiza una vista que muestra varios registros de una
 *  tabla de la base de datos, ya sea en vista de árbol o kanban.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ {@link IACele.API.Database.TableName TableName} ] `table`: Nombre de la
 *  tabla de base de datos para extraer los nombres de los campos.
 *  - [ {@link IACele.View.Tree.ViewConfig ViewConfig} ] `viewConfig`:
 *  Configuración de vista de columnas de la tabla.
 *  - [ `string` ] `emptyContent`: Leyenda para mostrar cuando no existan datos
 *  a mostrar.
 *  - [ {@link IACele.View.Kanban.ChildrenRenderer ChildrenRenderer} ] `kanban`
 *  Esta función sirve para realizar la declaración de la vista Kanban.
 */ 
const ListDataFetcher = <K extends IACele.API.Database.TableName>({
    table,
    viewConfig,
    emptyContent,
    kanban,
}: IACele.View.Tree.ListRenderer<K>) => {

    const {
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
    } = useListDataFetcher(table, viewConfig);

    useEffect(
        () => {
            // Se establece el contenido JSX en la barra de navegación
            setDynamicControls(
                <div className="flex flex-row gap-1">
                    <Pagination count={count} currentPage={currentPage} totalPages={totalPages} prevPage={prevPage} nextPage={nextPage} />

                    {/* Control de ordenamiento de datos */}
                    <Sizeable>
                        {({ view }) => {
                            if ( view === 'desktop' ) {
                                return (
                                    <SelectTemplate
                                        selectionMode="multiple"
                                        toggleableKeys={toggleableColumns as unknown as {name: K, label: string}[]}
                                        selectedKeys={visibleColumnsKeys as Set<string>}
                                        setSelectedKeys={setVisibleColumnsKeys}
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
                                            toggleableKeys={sorteableFields as unknown as {name: K, label: string}[]}
                                            selectedKeys={kanbanSortingField as Set<string>}
                                            setSelectedKeys={setKanbanSortingField as (keys: IACele.UI._SharedSelection) => void}
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
                </div>
            );
            return ( () => setDynamicControls(null) );
        }, [
            setDynamicControls,
            count,
            currentPage,
            totalPages,
            nextPage,
            prevPage,
            toggleableColumns,
            visibleColumnsKeys,
            setVisibleColumnsKeys,
            sorteableFields,
            kanbanSortingField,
            setKanbanSortingField,
            selectedSortingDirection,
            setSelectedSortingDirection,
        ]
    );

    return (
        <div className="size-full">
            <div className="hidden sm:block h-full">
                <Tree<K>
                    emptyContent={emptyContent}
                    loading={loading}
                    records={records}
                    table={table}
                    viewConfig={visibleColumns}
                    selectedSortingDirection={selectedSortingDirection}
                    sortingFieldKey={sortingFieldKey}
                    toggleSortingColumn={toggleSortingColumn}
                />
            </div>
            <div className="sm:hidden block h-full">
                <KanbanWrapper<K>
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
