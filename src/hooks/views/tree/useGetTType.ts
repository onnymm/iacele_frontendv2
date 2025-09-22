import { useCallback } from "react";

const useGetTType = <M extends ModelName>(
    fieldsIndex: Record<IACele.Data.Models.FieldName<M>, IACele.Data.Models.Field<M>>,
) => {

    // Inicialización de función de obtención de tipo de dato de campo
    const getTType = useCallback(
        (name: IACele.Data.Models.FieldName<M>) => {
            // Obtención del tipo de dato
            const ttype = fieldsIndex[name].ttype;

            return ttype;
        }, [fieldsIndex]
    );

    return { getTType };
};

export default useGetTType;
