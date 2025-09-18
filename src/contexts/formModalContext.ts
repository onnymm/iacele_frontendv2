import { createContext } from "react";

const FormModalContext = createContext<IACele.Context.View.Modal>({
    isConfirmOpen: false,
    isDoneOpen: false,
    onConfirmOpen: () => (null),
    onDoneOpen: () => (null),
    setConfirmMessage: () => (null),
    setDoneMessage: () => (null),
    setExecute: () => (null),
    setColor: () => (null),
});

export default FormModalContext;
