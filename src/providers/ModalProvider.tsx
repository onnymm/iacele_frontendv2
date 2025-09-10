import ModalConfirm from "../components/views/form/ModalConfirm";
import ModalDone from "../components/views/form/ModalDone";
import FormModalContext from "../contexts/formModalContext";
import useModalView from "../hooks/views/useModalView";

const ModalProvider = ({
    children,
}: GenericWrapperComponent) => {

    const {
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
    } = useModalView();

    return (
        <FormModalContext.Provider value={{ isConfirmOpen, onConfirmOpen, isDoneOpen, onDoneOpen, setDoneMessage, setColor, setConfirmMessage, setExecute }}>
                {children}
                <ModalConfirm isOpen={isConfirmOpen} onOpenChange={onConfirmOpenChange} execute={execute} color={color} message={confirmMessage} />
                <ModalDone isOpen={isDoneOpen} onOpenChange={onDoneOpenChange} message={doneMessage} />
        </FormModalContext.Provider>
    );
};

export default ModalProvider;
