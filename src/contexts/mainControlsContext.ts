import { createContext } from "react";

const MainControlsContext = createContext<IACeleV2.Context.Application.Controls.MainControls>({
    mainControls: null,
    setMainControls: () => null,
});

export default MainControlsContext;
