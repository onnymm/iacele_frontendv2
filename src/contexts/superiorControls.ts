import { createContext } from "react";

const SuperiorControlsContext = createContext<IACeleV2.Context.Application.Controls.SuperiorControls>({
    superiorControls: null,
    setSuperiorControls: () => null,
});

export default SuperiorControlsContext;
