import { createContext } from "react";

const FormModal = createContext<IACele.Context.FormModal>({
    isConfirmOpen: false,
    isDoneOpen: false,
    onConfirmOpen: () => null,
    onDoneOpen: () => null,
    setDoneMessage: () => null,
    setConfirmMessage: () => null,
    setExecute: () => null,
    setColor: () => null,
});

export default FormModal;
