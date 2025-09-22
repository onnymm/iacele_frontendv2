import { useCallback, useContext } from "react";
import TreeContext from "../../../contexts/view/tree/TreeContext";

const useExecuteTreeValidation = <M extends ModelName>(
    treeRecordsIndex: Record<number, IACele.Data.Models.Record<M>>,
) => {

    // Obtención de los datos del formulario
    const { metadataFromAPI } = useContext(TreeContext as React.Context<IACele.Context.View.List.Tree<M>>);

    // Obtención de los nombres de los campos
    const fieldNames = metadataFromAPI.map( (fieldData) => (fieldData.name) );

    // Creación de la función de validación para ser usada en caso de requerirse
    const executeTreeValidation = useCallback(
        (
            id: number,
            validation: IACele.View.UsingRecord<M, boolean> | undefined,
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

                console.log(treeRecordsIndex[id]);
                console.log(fieldNames);

                // Inicialización de un nuevo objeto en blanco
                const recordData: Partial<IACele.Data.Models.Record<M>> = {};

                // Se cambian todos los valores indefinidos a nulos en el objeto creado
                fieldNames.forEach(
                    (fieldName) => {
                        if ( treeRecordsIndex[id][fieldName] === undefined ) {
                            recordData[fieldName] = null as never;
                        } else {
                            recordData[fieldName] = treeRecordsIndex[id][fieldName] as never;
                        };
                    }
                );

                // Ejecución de validación
                const resolution = Boolean( validation(recordData as IACele.Data.Models.Record<M>) );

                return resolution;
            };

        }, [fieldNames, treeRecordsIndex]
    );

    return { executeTreeValidation };
};

export default useExecuteTreeValidation;
