import { useContext, useMemo } from "react";
import TreeContext from "../../../contexts/view/tree/TreeContext";

const useTreeRecordsIndex = <M extends ModelName>() => {

    // Obtención del valor desde el contexto
    const { dataFromAPI } = useContext(TreeContext as React.Context<IACele.Context.View.List.Tree<M>>);

    // Inicialización de índice de registros
    const treeRecordsIndex = useMemo(
        () => {
            // Inicialización de objeto a retornar
            const index: Record<number, IACele.Data.Models.Record<M>> = {};
            // Se lleno el objeto
            dataFromAPI.forEach(
                (record) => {
                    index[record.id] = record;
                }
            );

            return index;
        }, [dataFromAPI]
    );

    return { treeRecordsIndex };
};

export default useTreeRecordsIndex;
