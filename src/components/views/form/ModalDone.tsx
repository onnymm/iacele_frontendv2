import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";
import Sizeable from "../../common/Sizeable";

/** 
 *  ## Modal de notificación
 *  Este componente renderiza un modal para notificar que la acción de
 *  servidor fue ejecutada exitosamente.
 *  
 *  ### Parámetros de entrada
 *  - [ `boolean` ] `isOpen`: Estado que indica que el modal está abierto.
 *  - [ {@link IACele.UI.DecorationColor DecorationColor} ] `color`: Color UI
 *  de componentes dentro del modal.
 *  - [ `string` ] `message`: Mensaje a mostrar en el modal.
 */ 
const ModalDone: React.FC<IACele.UI.Modal.Generic> = ({
    isOpen,
    onOpenChange,
    message,
}) => {

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>Acción ejecutada exitosamente</ModalHeader>
                        <ModalBody>{message}</ModalBody>
                        <ModalFooter>
                            <Sizeable>
                                {({ componentSize }) => (
                                    <Button size={componentSize} onPress={onClose}>Aceptar</Button>
                                )}
                            </Sizeable>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default ModalDone;
