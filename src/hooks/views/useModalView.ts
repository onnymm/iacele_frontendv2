import { useDisclosure } from "@heroui/react";
import { useState } from "react";

interface ModalFormParams {
    isConfirmOpen: boolean;
    onConfirmOpen: () => void;
    onConfirmOpenChange: () => void;
    isDoneOpen: boolean;
    onDoneOpen: () => void;
    onDoneOpenChange: () => void;
    confirmMessage: string;
    setConfirmMessage: React.Dispatch<React.SetStateAction<string>>;
    doneMessage: string;
    setDoneMessage: React.Dispatch<React.SetStateAction<string>>;
    execute: () => void;
    setExecute: React.Dispatch<React.SetStateAction<() => void>>;
    color: IACele.UI.DecorationColor;
    setColor: React.Dispatch<React.SetStateAction<IACele.UI.DecorationColor>>;
};

/** 
 *  ##  Modal de formulario
 *  Este Custom Hook crea e inicializa todos los estados, funciones y funciones
 *  de cambio de estado para usarse en el modal del formulario.
 */ 
const useModalView = (): ModalFormParams => {

    // Creación de valores para modal del confirmación
    const { isOpen: isConfirmOpen, onOpen: onConfirmOpen, onOpenChange: onConfirmOpenChange } = useDisclosure();
    const { isOpen: isDoneOpen, onOpen: onDoneOpen, onOpenChange: onDoneOpenChange } = useDisclosure();

    // Inicialización de estados y funciones de cambio de estado para modales
    const [ confirmMessage, setConfirmMessage ] = useState<string>('');
    const [ doneMessage, setDoneMessage ] = useState<string>('');
    const [ execute, setExecute ] = useState<() => void>(() => (() => null));
    const [ color, setColor ] = useState<IACele.UI.DecorationColor>();

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
