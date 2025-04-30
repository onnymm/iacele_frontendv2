import { useContext, useEffect } from "react";
import FormModal from "../../contexts/formModalContext";
import APIContext from "../../contexts/apiContext";

/** 
 *  ## Creación de función de tarea
 *  Este Custom Hook crea la función a utilizar en el botón de tarea de
 *  servidor para ejecutar la llamada al servidor.
 */ 
const useTask = <K extends IACele.API.Database.TableName>(
    execute: string,
    color: IACele.UI.DecorationColor,
    table: K,
    confirm: string | undefined,
    notify: string | undefined,
    reload: () => void,
) => {

    // Obtención de instancia de API
    const { api } = useContext(APIContext);

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

    return { executeWithConfirmation };
};

export default useTask;
