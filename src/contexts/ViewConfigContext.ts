import { createContext } from "react";

const ViewConfigContext = createContext<IACele.Context.ViewConfig<any>>({
    pushViewConfig: () => null,
});

export default ViewConfigContext;
