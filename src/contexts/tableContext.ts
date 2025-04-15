import { createContext } from "react";

const TableContext = createContext<IACele.View._OptionalTableUse<any>>({
    table: null,
});

export default TableContext;
