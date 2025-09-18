import { createContext } from "react";

const SuperiorControlsContext = createContext<IACele.Context.Application.Controls.SuperiorControls>({
    superiorControls: null,
    setSuperiorControls: () => null,
});

export default SuperiorControlsContext;
