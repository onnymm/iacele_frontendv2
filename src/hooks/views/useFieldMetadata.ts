import { useContext } from "react";
import RecordFormContext from "../../contexts/view/form/RecordFormContext";

const useFieldMetadata = <M extends ModelName>(
    name: IACeleV2.Data.Models.FieldName<M>,
): IACeleV2.View.Form.FieldMetadata<M> => {

    // Obtención de los datos del registro
    const { fieldsMetadata } = useContext(RecordFormContext) as IACeleV2.Context.View.Form<M>;

    // Obtención de los metadatos del campo
    const fieldMetadata = fieldsMetadata.find( (atts) => (atts.name === name) ) as IACeleV2.Data.Models.Field<M>;

    return { fieldMetadata };
};

export default useFieldMetadata;
