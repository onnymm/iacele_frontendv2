import RecordFormContext from "../../../contexts/recordFormContext";
import Page from "./Page";
import Sheet from "./Sheet";
import Group from "./Group";
import Header from "./Header";
import useFormRecord from "../../../hooks/views/useFormRecord";
import Field from "./Field";
import Action from "./Action";
import { useDisclosure } from "@heroui/react";
import React, { useState } from "react";
import FormModal from "../../../contexts/formModalContext";
import ModalConfirm from "./ModalConfirm";
import ModalDone from "./ModalDone";

/** 
 *  ## Vista de formulario
 *  Este componente renderiza una vista de formulario declarada como children
 *  de éste en forma de función flecha, dinámicamente tipada por el nombre de
 *  la tabla del registro a visualizar.
 *  
 *  `< tsx >...</ tsx >` Contiene elementos hijos.
 *  
 *  ### Uso:
 *  La declaración de la estructura del formulario es como la siguiente:
 *  ```
    <Form<'base.users'> table="base.users" readonly>
        {({ Field, Group, Page, Sheet }) => (
            <Page>
                <Sheet>
                    <Group label='Datos básicos'>
                        <Field name="name" />
                        <Field name="user" />
                        <Group>
                            <Field name="id"/>
                            <Field name="odooId"/>
                        </Group>
                    </Group>
                    <Group label='Historial'>
                        <Field name="createDate" />
                        <Field name="writeDate" />
                    </Group>
                </Sheet>
            </Page>
        )}
    </Form>
 *  ```
 *  
 *  ### Parámetros de entrada
 *  - [ {@link IACele.View.Form._Children ChildrenRenderer} ] `children`: Función que
 *  renderiza la vista de formulario.
 *  - [ {@link IACele.API.Database.TableName TableName} ] `table`: Nombre de la tabla del 
 *  registro a visualizar.
 *  - [ `boolean` ] `readonly`: Vista de solo lectura.
 */ 
const Form = <T extends IACele.API.Database.TableName>({
    children,
    table,
    readonly,
}: IACele.View.Form.Component<T>): React.ReactNode => {

    // Obtención del registro a mostrar
    const { record, reload } = useFormRecord(table);

    // Creación de valores para modal del confirmación
    const { isOpen: isConfirmOpen, onOpen: onConfirmOpen, onOpenChange: onConfirmOpenChange } = useDisclosure();
    const { isOpen: isDoneOpen, onOpen: onDoneOpen, onOpenChange: onDoneOpenChange } = useDisclosure();

    // Inicialización de estados y funciones de cambio de estado para modales
    const [ confirmMessage, setConfirmMessage ] = useState<string>('');
    const [ doneMessage, setDoneMessage ] = useState<string>('');
    const [ execute, setExecute ] = useState<() => void>(() => (() => null));
    const [ color, setColor ] = useState<IACele.UI.DecorationColor>();

    // Si se obtuvo el registro se renderiza el formulario
    if ( record ) {
        return (
            <form className="group p-2 w-full h-min min-h-full ui-view-form">

                <RecordFormContext.Provider value={{ table, record, readonly, reload }}>
                <FormModal.Provider value={{ isConfirmOpen, isDoneOpen, onConfirmOpen, onDoneOpen, setConfirmMessage, setDoneMessage, setExecute, setColor }}>
                    {children({ Page, Header, Sheet, Field, Group, Action: Action<T> })}
                </FormModal.Provider>
                </RecordFormContext.Provider>

                <ModalConfirm isOpen={isConfirmOpen} onOpenChange={onConfirmOpenChange} execute={execute} color={color} message={confirmMessage} />
                <ModalDone isOpen={isDoneOpen} onOpenChange={onDoneOpenChange} message={doneMessage} />
            </form>
        );
    };
};

export default Form;
