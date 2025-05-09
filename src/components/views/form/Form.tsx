import RecordFormContext from "../../../contexts/recordFormContext";
import Page from "./Page";
import Sheet from "./Sheet";
import Group from "./Group";
import Header from "./Header";
import useFormRecord from "../../../hooks/views/useFormRecord";
import Field from "./Field";
import Action from "./Action";
import FormModal from "../../../contexts/formModalContext";
import ModalConfirm from "./ModalConfirm";
import ModalDone from "./ModalDone";
import useModalView from "../../../hooks/views/useModalView";
import React, { useContext, useEffect } from "react";
import MainControlsContext from "../../../contexts/mainControlsContext";
import Options from "./Options";

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
const Form = <K extends IACele.API.Database.TableName>({
    children,
    table,
    readonly,
    canDelete = true,
}: IACele.View.Form.Component<K>): React.ReactNode => {

    // Obtención del registro a mostrar
    const { record, reload } = useFormRecord(table);

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

    // Obtención de función desde el contexto
    const { setMainControls } = useContext(MainControlsContext);

    useEffect(
        () => {
            // Si existe registro y éste se puede eliminar...
            if ( record && canDelete )
            setMainControls(
                <FormModal.Provider value={{ isConfirmOpen, isDoneOpen, onConfirmOpen, onDoneOpen, setConfirmMessage, setDoneMessage, setExecute, setColor }}>
                    <Options canDelete={canDelete} id={record.id} table={table} />
                </FormModal.Provider>
            );

            return ( () => setMainControls(null) );
        }, [canDelete, record, setMainControls, table, isConfirmOpen, isDoneOpen, onConfirmOpen, onDoneOpen, setColor, setConfirmMessage, setDoneMessage, setExecute]
    );

    // Si se obtuvo el registro se renderiza el formulario
    if ( record ) {
        return (
            <form className="group p-2 w-full h-min min-h-full ui-view-form">

                <RecordFormContext.Provider value={{ table, record, readonly, reload }}>
                <FormModal.Provider value={{ isConfirmOpen, isDoneOpen, onConfirmOpen, onDoneOpen, setConfirmMessage, setDoneMessage, setExecute, setColor }}>
                    {children({ Page, Header, Sheet, Field, Group, Action: Action<K> })}
                </FormModal.Provider>
                </RecordFormContext.Provider>

                <ModalConfirm isOpen={isConfirmOpen} onOpenChange={onConfirmOpenChange} execute={execute} color={color} message={confirmMessage} />
                <ModalDone mode="action" isOpen={isDoneOpen} onOpenChange={onDoneOpenChange} message={doneMessage} />
            </form>
        );
    };
};

export default Form;
