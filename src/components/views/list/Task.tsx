import { useContext, useEffect } from "react";
import useAPI from "../../../hooks/app/useAPI";
import Button from "../../ui/Button";
import FormModal from "../../../contexts/formModalContext";

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

    // Obtención de instancia de API
    const { api } = useAPI();

    // Creación de función para ejecutar la tarea de servidor
    const executeTask = async () => {
        // Ejecución de la tarea en el backend
        const response = await api.task<K>({ table, task: execute });
        // Si la tarea se ejecutó correctamente se realiza una recarga de los datos del formulario
        if ( response ) reload();
    };

    // Obtención de estados y funciones desde Hook
    const { isConfirmOpen, onConfirmOpen, onDoneOpen, setExecute, setConfirmMessage, setDoneMessage, setColor } = useContext(FormModal);

    // Función que ejecuta acción y notifica si es necesario
    const executeAndNotify = async () => {
        await executeTask();
        if ( notify ) {
            setDoneMessage(notify);
            onDoneOpen();
        };
    };

    // Función que confirma antes de realizar la acción
    const executeWithConfirmation = async () => {
        if ( confirm ) {
            setExecute( () => (executeAndNotify) );
            setConfirmMessage(confirm);
            setColor(color);
            onConfirmOpen();
        } else {
            await executeAndNotify();
        };
    };

    // Se reestablecen los valores del modal cuando éste se cierra
    useEffect(
        () => {
            if ( !isConfirmOpen ) {
                setExecute(() => (() => null));
                setConfirmMessage('');
                setColor(undefined);
            };
        }, [isConfirmOpen, setColor, setExecute, setConfirmMessage]
    );

    return (
        <Button onPress={executeWithConfirmation} color={color}>
            {name}
        </Button>
    );
};

export default Task;
