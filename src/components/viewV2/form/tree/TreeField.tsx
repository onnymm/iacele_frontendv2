import { useContext } from "react";
import FormTreeContext from "../../../../contexts/view/form/FormTreeContext";

const TreeField = <
    M extends ModelName,
    F extends IACeleV2.Data.Models.FieldName<M>,
    R extends IACeleV2.Data.Models.RelatedModelName<M, F>,
>({
    name,
    label,
}: IACeleV2.View.Tree.Field.Params<M, F, R>) => {

    // Obtención de función para añadir vista desde el contexto
    const { addConfig } = useContext<IACeleV2.Context.View.FormTree<M, F, R>>(FormTreeContext);

    // Se añade la vista
    addConfig({ name, label });

    return null;
};

export default TreeField;
