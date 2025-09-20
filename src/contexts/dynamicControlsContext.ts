import { createContext } from "react";

const DynamicControlsContext = createContext<IACele.Context.Application.Controls.DynamicControls>({
    dynamicControls: null,
    setDynamicControls: () => (null),
});

export default DynamicControlsContext;
