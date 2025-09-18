import { useDisclosure } from "@heroui/react";
import { useState } from "react";

/** 
 *  ##  Modal de formulario
 *  Este Custom Hook crea e inicializa todos los estados, funciones y funciones
 *  de cambio de estado para usarse en el modal del formulario.
 */ 
const useModalView = (): IACele.Hook.View.Modal => {

    // Creación de valores para modales
    const { isConfirmOpen, onConfirmOpen, onConfirmOpenChange, confirmMessage, setConfirmMessage } = useConfirmationModal();
    const { isDoneOpen, onDoneOpen, onDoneOpenChange, doneMessage, setDoneMessage } = useDoneModal();
    const { execute, setExecute } = useExecute();

    // Inicialización de estado de color de modal
    const [ color, setColor ] = useState<IACele.UI.UIColor>();

    return {
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
    };
};

export default useModalView;

const useConfirmationModal = (): IACele.View.Modal.ConfirmationModal => {

    // Obtención de valores desde Hook
    const { isOpen: isConfirmOpen, onOpen: onConfirmOpen, onOpenChange: onConfirmOpenChange } = useDisclosure();
    // Inicialización de estado de mensaje de modal
    const [ confirmMessage, setConfirmMessage ] = useState<string>('');

    return { isConfirmOpen, onConfirmOpen, onConfirmOpenChange, confirmMessage, setConfirmMessage };
};

const useDoneModal = (): IACele.View.Modal.DoneModal => {

    // Obtención de valores desde Hook
    const { isOpen: isDoneOpen, onOpen: onDoneOpen, onOpenChange: onDoneOpenChange } = useDisclosure();
    // Incialización de estado de mensaje de modal
    const [ doneMessage, setDoneMessage ] = useState<string>('');

    return { isDoneOpen, onDoneOpen, onDoneOpenChange, doneMessage, setDoneMessage };
};

const useExecute = (): IACele.View.Modal.Callback => {

    // Inicialización de función de ejemplo
    const voidCallback: IACele.Common.VoidCallback = () => (null);

    // Inicialización de estado de función de ejecución
    const [ execute, setExecute ] = useState<IACele.Common.VoidCallback>(
        () => (voidCallback)
    );

    return { execute, setExecute };
};
