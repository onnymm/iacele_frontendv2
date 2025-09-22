import { useContext } from "react";
import TreeContext from "../../../../contexts/view/tree/TreeContext";

const Field = <M extends ModelName>({
    name,
    label,
    decoration,
}: IACele.View.List.Tree.Config<M>) => {

    // Obtención de función para vista desde el contexto
    const { addConfig } = useContext(TreeContext as React.Context<IACele.Context.View.List.Tree<M>>);
    // Se añade la vista
    addConfig({ name, label, decoration, });

    return null;
};

export default Field;
