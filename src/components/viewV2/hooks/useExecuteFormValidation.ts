import { useCallback } from "react";
import useFormRecordContext from "./useFormRecordContext";

const useExecuteFormValidation = <M extends ModelName>(): IACele.Hook.View.Form.ExecuteFormValidation<M> => {

    // Obtención de los datos del formulario
    const { formRecord, fieldsMetadata } = useFormRecordContext<M>();

    // Obtención de los nombres de los campos
    const fieldNames = fieldsMetadata.map( (fieldData) => (fieldData.name) );

    // Creación de la función de validación para ser utilizada en caso de requerirse
    const executeFormValidation = useCallback(
        (validation: IACele.View.UsingRecord<M, boolean> | undefined) => {

            // Si el valor de la validación es indefinido...
            if ( validation === undefined ) {
                // Se retorna falso
                return false;

            // Si el valor de la validación es booleano...
            } else if ( typeof validation === 'boolean' ) {
                // Se retorna el valor de ésta
                return validation;

            // Si el valor de la validación es una función...
            } else {

                // Inicialización de un nuevo objeto en blanco
                const formRecordData: Partial<IACele.Data.Models.Record<M>> = {};

                // Se cambian todos los valores indefinidos a nulos en el objeto creado
                fieldNames.forEach(
                    (fieldName) => {
                        if ( formRecord[fieldName] === undefined ) {
                            formRecordData[fieldName] = null as never;
                        } else {
                            formRecordData[fieldName] = formRecord[fieldName] as never;
                        };
                    }
                );

                // Ejecución de validación
                const resolution = Boolean( validation(formRecordData as IACele.Data.Models.Record<M>) );

                return resolution;
            };
        }, [fieldNames, formRecord]
    );

    return { executeFormValidation };
};

export default useExecuteFormValidation;
