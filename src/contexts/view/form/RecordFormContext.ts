import { createContext } from "react";

const RecordFormContext = createContext<IACeleV2.Context.View.Form<any>>({
    modelName: undefined,
    readonly: undefined,
    formMode: 'create',
    formRecord: {},
    reload: () => null,
    setFormRecordField: () => null,
    fieldsMetadata: [],
    saveChanges: () => null,
});

export default RecordFormContext;
