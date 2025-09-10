import { useContext } from "react";
import FormTreeContext from "../../../../contexts/view/form/FormTreeContext";

const TreeField = <M extends ModelName>({
    name,
    label,
}: IACeleV2.View.Tree.Field.Params<M>) => {

    // Obtención de función para añadir vista desde el contexto
    const { addConfig } = useContext<IACeleV2.Context.View.FormTree<M, IACeleV2.Data.Models.FieldName<M>, IACeleV2.Data.Models.RelatedModelName<M, IACeleV2.Data.Models.FieldName<M>>>>(FormTreeContext);

    // Se añade la vista
    addConfig({ name, label });

    return null;
};

export default TreeField;
