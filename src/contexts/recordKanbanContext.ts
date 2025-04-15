import { createContext } from "react";

const RecordKanbanContext = createContext<IACele.Context.RecordKanban<any>>({
    record: null,
});

export default RecordKanbanContext;
