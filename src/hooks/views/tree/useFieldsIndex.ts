import { useContext, useMemo } from "react";
import TreeContext from "../../../contexts/view/tree/TreeContext";

const useFieldsIndex = <M extends ModelName>() => {

    // Obtención del valor desde el contexto
    const { metadataFromAPI } = useContext(TreeContext as React.Context<IACele.Context.View.List.Tree<M>>);

    // Inicialización de índice de campos
    const fieldsIndex = useMemo(
        () => {
            // Inicialización de objeto a retornar
            const index: Partial<Record<IACele.Data.Models.FieldName<M>, IACele.Data.Models.Field<M>>> = {};
            // Se llena el objeto
            metadataFromAPI.forEach(
                (field) => {
                    index[field.name] = field;
                }
            );

            return index as Record<IACele.Data.Models.FieldName<M>, IACele.Data.Models.Field<M>>;
        }, [metadataFromAPI]
    );

    return { fieldsIndex };
};

export default useFieldsIndex;
