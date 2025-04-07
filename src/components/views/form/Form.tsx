import { useCallback, useEffect, useState } from "react";
import useAPI from "../../../hooks/app/useAPI";
import useViewName from "../../../hooks/app/usePageName";
import RecordFormContext from "../../../contexts/recordFormContext";
import Page from "./Page";
import Sheet from "./Sheet";
import Field from "../../ui/Field";
import Group from "./Group";
import Header from "./Header";

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
 *  <Form<'base.users'> id={id} table="base.users" readonly>
 *      {({ Field, Group, Page, Sheet }) => (
 *          <Page>
 *              <Sheet>
 *                  <Group label='Datos básicos'>
 *                      <Field name="name" />
 *                      <Field name="user" />
 *                      <Group>
 *                          <Field name="id"/>
 *                          <Field name="odooId"/>
 *                      </Group>
 *                  </Group>
 *                  <Group label='Historial'>
 *                      <Field name="createDate" />
 *                      <Field name="writeDate" />
 *                  </Group>
 *              </Sheet>
 *          </Page>
 *      )}
 *  </Form>
 *  ```
 *  
 *  ### Parámetros de entrada
 *  - [ `undefined` ] `children`: Función que renderiza la vista de formulario.
 *  - [ `number` ] `id`: ID del registro a visualizar.
 *  - [ {@link API.Database.TableName} ] `table`: Nombre de la tabla del 
 *  registro a visualizar.
 *  - [ `boolean` ] `readonly`: Vista de solo lectura.
 */ 
const Form = <T extends IACele.API.Database.TableName>({
    children,
    id,
    table,
    readonly,
}: IACele.Core.UI.Form<T>): React.ReactNode => {

    // Obtención de la función de cambio de estado para establecer el nombre de la vista
    const { setViewName } = useViewName();
    // Obtención de instancia de API
    const api = useAPI();

    // Inicialización de estado del registro
    const [ record, setRecord ] = useState<IACele.API.DataTypes.GenericRecord | null>(null);

    // Función para mostrar los datos en la vista
    const fetchData = useCallback(
        async () => {

            // Obtención de los datos desde el backend
            const record = await api.read<T>({
                id,
                tableName: table,
            });

            // Se establece el valor del registro
            setRecord(record);
        }, [id, table, api]
    );

    // Ejecución de función para mostrar los datos
    useEffect(
        () => {
            fetchData();
        }, [fetchData]
    );

    // Se establece el nombre de la vista
    useEffect(
        () => {
            if ( record ) setViewName(record.name as string);
        }, [record, setViewName]
    );

    // Si se obtuvo el registro se renderiza el formulario
    if ( record ) {
        return (
            <form className="group p-2 w-full h-min min-h-full ui-view-form">
                <RecordFormContext.Provider value={{ tableName: table, record, formReadonly: readonly }}>
                    { children({ Page, Header, Sheet, Field, Group }) }
                </RecordFormContext.Provider>
            </form>
        );
    };
};

export default Form;
