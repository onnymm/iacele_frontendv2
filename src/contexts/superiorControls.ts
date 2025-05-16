import { createContext } from "react";

const SuperiorControlsContext = createContext<IACele.Context.SuperiorControls>({
    superiorControls: null,
    setSuperiorControls: () => null,
});

export default SuperiorControlsContext;
