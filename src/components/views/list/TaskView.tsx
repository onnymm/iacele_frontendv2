import { useContext } from "react";
import TasksContext from "../../../contexts/tasksContext";

/** 
 *  ## Declaración de tarea de servidor
 *  Este componente declara la creación de un botón que ejecuta una tarea de
 *  servidor.
 *  
 *  - `<tsx />` Se autocierra.
 */ 
const TasksView: React.FC<IACele.View.Do> = ({
    name,
    execute,
    color,
    confirm,
    notify,
}) => {

    const { pushTask } = useContext(TasksContext);

    pushTask({
        name,
        execute,
        color,
        confirm,
        notify,
    });

    return null;
};

export default TasksView;
