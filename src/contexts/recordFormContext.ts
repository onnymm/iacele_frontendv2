import { createContext } from "react";

const RecordFormContext = createContext<IACele.Context.FormField<any>>({
    table: undefined,
    record: null,
    readonly: undefined,
    reload: () => null,
});

export default RecordFormContext;
