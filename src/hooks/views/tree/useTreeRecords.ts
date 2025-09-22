import { useContext } from "react";
import TreeContext from "../../../contexts/view/tree/TreeContext";
import useTreeRecordsIndex from "./useTreeRecordsIndex";
import useFieldsIndex from "./useFieldsIndex";
import useGetTType from "./useGetTType";
import useComputeLabel from "./useComputeLabel";
import useComputeFieldDecoration from "./useComputeFieldDecoration";

const useTreeRecords = <M extends ModelName>() => {

    // Obtención de valores desde el contexto
    const { config } = useContext(TreeContext as React.Context<IACele.Context.View.List.Tree<M>>);

    // Inicialización de índice de registros
    const { treeRecordsIndex } = useTreeRecordsIndex<M>();
    // Inicialización de índice de campos
    const { fieldsIndex } = useFieldsIndex<M>();
    // Inicialización de función de obtención de tipo de dato de campo
    const { getTType } = useGetTType<M>(fieldsIndex);
    // Inicialización de función de cómputo de etiqueta de campo
    const { computeLabel } = useComputeLabel<M>(fieldsIndex, config);
    // Inicialización de función de cómputo de color de widget
    const { executeValidation } = useComputeFieldDecoration(treeRecordsIndex);

    return { treeRecordsIndex, fieldsIndex, getTType, computeLabel, executeValidation };
};

export default useTreeRecords;
