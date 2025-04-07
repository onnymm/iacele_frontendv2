import { createContext } from "react";

const RecordFormContext = createContext<IACele.Context.RecordForm>({
    tableName: 'base.users',
    record: null,
    formReadonly: undefined,
});

export default RecordFormContext;
