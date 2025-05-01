import Button from "../../ui/Button";
import useTask from "../../../hooks/views/useTask";
import useAsyncDisabled from "../../../hooks/app/useAsyncDisabled";

/** 
 *  ## Tarea de servidor
 *  Declaración de una tarea de servidor a ejecutar. Este componente se usa en
 *  la vista de Lista en el componente {@link List}.
 *  
 *  - `<tsx />` Se autocierra.
 */ 
const Task = <K extends IACele.API.Database.TableName>({
    execute,
    color,
    table,
    name,
    confirm,
    notify,
    reload,
}: IACele.View.List.Tasks.Component<K>) => {

    const { executeWithConfirmation } = useTask(
        execute,
        color,
        table,
        confirm,
        notify,
        reload,
    );

    // Creación de deshabilitado asíncrono
    const [ isDisabled ] = useAsyncDisabled(false);

    return (
        <Button isDisabled={isDisabled} onPress={executeWithConfirmation} color={color}>
            {name}
        </Button>
    );
};

export default Task;
