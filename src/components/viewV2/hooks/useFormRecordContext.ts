import { useContext } from "react";
import RecordFormContext from "../../../contexts/view/form/RecordFormContext";

const useFormRecordContext = <M extends ModelName>(): IACeleV2.Context.View.Form<M> => {

    // Obtención de los datos del registro
    const {
        fieldsMetadata,
        formMode,
        formRecord,
        modelName,
        reload,
        setFormRecordField,
        readonly,
        saveChanges,
    } = useContext(RecordFormContext) as IACeleV2.Context.View.Form<M>;

    return {
        fieldsMetadata,
        formMode,
        formRecord,
        modelName,
        reload,
        setFormRecordField,
        readonly,
        saveChanges,
    };
};

export default useFormRecordContext;
