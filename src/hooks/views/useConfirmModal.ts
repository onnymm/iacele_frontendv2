import { useContext, useEffect } from "react";
import FormModal from "../../contexts/formModalContext";

/** 
 *  ## Modal de acción
 *  Este Custom Hook crea una función a ejecutar por un botón de acción de
 *  formulario, que abre un diálogo de confirmación para ejecutar la acción y/o
 *  un diálogo de notificación de que la acción fue ejecutada exitosamente.
 *  
 *  ### Parámetros de entrada
 *  - [ `function` ] `executeAction`: Acción a ejecutar en el backend.
 *  - [ `string | undefined` ] `confirmMessage`: Mensaje a mostrar en modal
 *  para confirmar si realmente se desea ejecutar la acción.
 *  - [ `string | undefined` ] `notifyMessage`: Mensaje a mostrar en modal
 *  cuando la acción se ejecutó correctamente.
 *  - [ {@link IACele.UI.DecorationColor DecorationColor} ] `color`: Color UI
 *  para botón de Aceptar enmodal.
 */ 
const useActionModal = (
    executeAction: () => Promise<void>,
    confirmMessage: string | undefined,
    notifyMessage: string | undefined,
    color: IACele.UI.DecorationColor,
) => {

    // Obtención de valores desde el contexto
    const { isConfirmOpen, onConfirmOpen, onDoneOpen, setExecute, setConfirmMessage, setDoneMessage, setColor } = useContext(FormModal);

    // Función que ejecuta acción y notifica si es necesario
    const executeAndNotify = async () => {
        await executeAction();
        if ( notifyMessage ) {
            setDoneMessage(notifyMessage);
            onDoneOpen();
        };
    };

    // Función que confirma antes de realizar la acción
    const executeWithConfirmation = async () => {
        if ( confirmMessage ) {
            setExecute( () => (executeAndNotify) );
            setConfirmMessage(confirmMessage);
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

export default useActionModal;
