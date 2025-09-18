import { useContext } from "react";
import RecordFormContext from "../../contexts/view/form/RecordFormContext";

const useFieldMetadata = <M extends ModelName>(
    name: IACele.Data.Models.FieldName<M>,
): IACele.View.Form.FieldMetadata<M> => {

    // Obtención de los datos del registro
    const { fieldsMetadata } = useContext(RecordFormContext) as IACele.Context.View.Form<M>;

    // Obtención de los metadatos del campo
    const fieldMetadata = fieldsMetadata.find( (atts) => (atts.name === name) ) as IACele.Data.Models.Field<M>;

    return { fieldMetadata };
};

export default useFieldMetadata;
