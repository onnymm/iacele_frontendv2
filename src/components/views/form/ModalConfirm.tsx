import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";
import Sizeable from "../../common/Sizeable";

/** 
 *  ## Modal de confirmación
 *  Este componente renderiza un modal con un mensaje para confirmar si se
 *  desea ejecutar la acción provista a éste y la ejecuta desde el botón de
 *  aceptar.
 *  
 *  ### Parámetros de entrada
 *  - [ `boolean` ] `isOpen`: Estado que indica que el modal está abierto.
 *  - [ `function` ] `onOpenChange`: Sepa qué hace esta función, proviene de
 *  la librería de HeroUI.
 *  - [ `function` ] `execute`: Función a ejecutar en un botón dentro del
 *  modal.
 *  - [ {@link IACele.UI.DecorationColor DecorationColor} ] `color`: Color UI
 *  de componentes dentro del modal.
 *  - [ `string` ] `message`: Mensaje a mostrar en el modal.
 */ 
const ModalConfirm: React.FC<IACele.UI.Modal.Confirm> = ({
    isOpen,
    onOpenChange,
    execute,
    color,
    message,
}) => {

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
            <ModalContent>
                {(onClose) => {
                    const onConfirm = () => {
                        execute();
                        onClose();
                    };
                    return (
                        <>
                            <ModalHeader>Confirmación</ModalHeader>
                            <ModalBody>{message}</ModalBody>
                            <ModalFooter>
                                <Sizeable>
                                    {({ componentSize }) => (
                                        <>
                                            <Button size={componentSize} onPress={onClose}>Cancelar</Button>
                                            <Button size={componentSize} onPress={onConfirm} color={color !== 'default' ? color : 'primary'}>Aceptar</Button>
                                        </>
                                    )}
                                </Sizeable>
                            </ModalFooter>
                        </>
                    )
                }}
            </ModalContent>
        </Modal>
    );
};

export default ModalConfirm;
