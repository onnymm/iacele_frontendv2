import { useContext } from "react";
import FormTreeContext from "../../../../contexts/view/form/FormTreeContext";

const TreeField = <
    M extends ModelName,
    F extends IACele.Data.Models.FieldName<M>,
    R extends IACele.Data.Models.RelatedModelName<M, F>,
>({
    name,
    label,
}: IACele.View.Tree.Field.Params<M, F, R>) => {

    // Obtención de función para añadir vista desde el contexto
    const { addConfig } = useContext<IACele.Context.View.FormTree<M, F, R>>(FormTreeContext);

    // Se añade la vista
    addConfig({ name, label });

    return null;
};

export default TreeField;
