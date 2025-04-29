import { useCallback, useMemo } from "react";
import ViewConfigContext from "../../../contexts/ViewConfigContext";
import TreeView from "../tree/TreeView";
import ListDataFetcher from "./ListDataFetcher";
import OpenRecordPath from "../../../contexts/OpenRecordPath";
import TasksContext from "../../../contexts/tasksContext";
import TaskView from "./TaskView";
import Tasks from "./Tasks";

/** 
 *  ## Lista de registros
 *  Este componente renderiza una vista de uno o más registros en forma de
 *  tabla o kanban recibiendo una declaración de la estructura de la vista por
 *  medio de una función flecha.
 *  
 *  `< tsx >...</ tsx >` Contiene elementos hijos.
 *  
 *  ### Parámetros de entrada
 *  - [ {@link IACele.API.Database.TableName T} ] `table`: Nombre de la tabla
 *  de base de datos para extraer
 *  los nombres de los campos.
 *  - [ `string` ] `emptyContent`: Leyenda para mostrar cuando no existan datos
 *  a mostrar.
 *  - [ {@link IACele.View.List.ChildrenRender ChildrenRender} ] `children`: Declaración de estructura de
 *  vista de árbol y kanban.
 */ 
const List = <T extends IACele.API.Database.TableName>({
    table,
    emptyContent,
    children,
    open,
}: IACele.View.List.Component<T>) => {

    const tasks: IACele.View.Do[] = useMemo(
        () => ([]), []
    );

    // Función para añadir parámetros de tareas de servidor
    const pushTask = useCallback(
        (task: IACele.View.Do) => {

            // Se busca el parámetro para saber si ya se encuentra en la configuración de tareas
            const foundTask = tasks.find( (existentTask) => existentTask.name === task.name )

            // Solo si éste no se encuentra, se añade
            if ( foundTask === undefined ) tasks.push(task);
        }, [tasks]
    );

    const viewConfig: IACele.View.Tree.ViewConfig<T> = useMemo(
        () => ([]), []
    );

    // Función para añadir configuraciones de columnas
    const pushViewConfig = useCallback(
        (config: IACele.View.Tree.Field<T>) => {

            // Se busca el parámetro para saber si ya se encuentra en la configuración de la vista
            const foundItem = viewConfig.find( (item) => (item.name === config.name) );

            // Solo si éste no se encuentra, se añade
            if ( foundItem === undefined ) viewConfig.push(config);
        }, [viewConfig]
    );

    // Obtención de las declaraciones de vista de árbol y kanban
    const [ tasksR, tree, kanban ] = useMemo(
        () => (
            children.length === 3
                ? children
                : [undefined, ...children]
        ), [children]
    ) as IACele.View.List.Component<T>['children'];

    return (
        <OpenRecordPath.Provider value={{ open }}>
            <TasksContext.Provider value={{ pushTask }}>
                {tasksR && tasksR({ Tasks, Task: TaskView })}
            </TasksContext.Provider>
            <ViewConfigContext.Provider value={{ pushViewConfig }}>
                {/* Aquí se genera el objeto viewConfig */}
                {tree({ Tree: TreeView })}
            </ViewConfigContext.Provider>

            {/* Aquí se utiliza el objeto viewConfig */}
            <ListDataFetcher
                table={table}
                viewConfig={viewConfig}
                emptyContent={emptyContent}
                kanban={kanban}
                tasks={tasks}
            />

        </OpenRecordPath.Provider>
    );
};

export default List;
