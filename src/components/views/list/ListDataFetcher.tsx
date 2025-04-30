import { useContext, useEffect } from "react";
import Tree from "../tree/Tree";
import KanbanWrapper from "../kanban/KanbanWrapper";
import useListDataFetcher from "../../../hooks/views/useListDataFetcher";
import Controls from "./Controls";
import useModalView from "../../../hooks/views/useModalView";
import ModalConfirm from "../form/ModalConfirm";
import ModalDone from "../form/ModalDone";
import MainControlsContext from "../../../contexts/mainControlsContext";
import FormModal from "../../../contexts/formModalContext";
import TasksPanel from "./TasksPanel";

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
    tasks,
}: IACele.View.Tree.ListRenderer<K>) => {

    // Obtención de función desde contexto
    const { setMainControls } = useContext(MainControlsContext);

    const {
        isConfirmOpen,
        onConfirmOpen,
        onConfirmOpenChange,
        isDoneOpen,
        onDoneOpen,
        onDoneOpenChange,
        confirmMessage,
        setConfirmMessage,
        doneMessage,
        setDoneMessage,
        execute,
        setExecute,
        color,
        setColor,
    } = useModalView();

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
        reload,
    } = useListDataFetcher<K>(table, viewConfig);

    useEffect(
        () => {
            // Se establece el contenido JSX en la barra de navegación
            setDynamicControls(
                <Controls
                    count={count}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    prevPage={prevPage}
                    nextPage={nextPage}
                    visibleColumnsKeys={visibleColumnsKeys}
                    toggleableColumns={toggleableColumns}
                    setVisibleColumnsKeys={setVisibleColumnsKeys}
                    selectedSortingDirection={selectedSortingDirection}
                    sorteableFields={sorteableFields}
                    kanbanSortingField={kanbanSortingField}
                    setKanbanSortingField={setKanbanSortingField}
                    setSelectedSortingDirection={setSelectedSortingDirection}
                />
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
            selectedSortingDirection,
            sorteableFields,
            kanbanSortingField,
            setKanbanSortingField,
            setSelectedSortingDirection,
        ]
    );

    useEffect(
        () => {
            setMainControls(
                <FormModal.Provider value={{ isConfirmOpen, isDoneOpen, onConfirmOpen, onDoneOpen, setConfirmMessage, setDoneMessage, setExecute, setColor }}>
                    <TasksPanel table={table} tasks={tasks} reload={reload} />
                </FormModal.Provider>
            );
            return ( () => setMainControls( null ) );
        }, [table, tasks, setMainControls, isConfirmOpen, isDoneOpen, onConfirmOpen, onDoneOpen, setColor, setConfirmMessage, setDoneMessage, setExecute, reload]
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
            <ModalConfirm isOpen={isConfirmOpen} onOpenChange={onConfirmOpenChange} execute={execute} color={color} message={confirmMessage} />
            <ModalDone mode="task" isOpen={isDoneOpen} onOpenChange={onDoneOpenChange} message={doneMessage} />
        </div>
    );
};

export default ListDataFetcher;
