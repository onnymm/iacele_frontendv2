import { useCallback, useContext } from "react";
import TreeContext from "../../../contexts/view/tree/TreeContext";
import { UserContext } from "../../../contexts/UserContext";

const useExecuteTreeValidation = <M extends ModelName>(
    treeRecordsIndex: Record<number, IACele.Data.Models.Record<M>>,
) => {

    // Obtención de los datos del formulario
    const { metadataFromAPI } = useContext(TreeContext as React.Context<IACele.Context.View.List.Tree<M>>);

    // Obtención de los nombres de los campos
    const fieldNames = metadataFromAPI.map( (fieldData) => (fieldData.name) );

    // Obtención de la ID del usuario
    const { userData } = useContext(UserContext)

    // Creación de la función de validación para ser usada en caso de requerirse
    const executeTreeValidation = useCallback(
        (
            id: number,
            validation: IACele.View.UsingRecordAndUser<M, boolean> | undefined,
        ) => {

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
                const data: Partial<IACele.View.RecordAndUID<M>> = {};

                // Se cambian todos los valores indefinidos a nulos en el objeto creado
                fieldNames.forEach(
                    (fieldName) => {
                        if ( treeRecordsIndex[id][fieldName] === undefined ) {
                            data[fieldName] = null as never;
                        } else {
                            data[fieldName] = treeRecordsIndex[id][fieldName] as never;
                        };
                    }
                );

                // Se añade la ID del usuario
                data.uid = userData.id as never;

                // Ejecución de validación
                const resolution = Boolean( validation(data as IACele.View.RecordAndUID<M>) );

                return resolution;
            };

        }, [fieldNames, treeRecordsIndex, userData]
    );

    return { executeTreeValidation };
};

export default useExecuteTreeValidation;
