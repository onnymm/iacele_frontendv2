import { createContext } from "react";

const MainControlsContext = createContext<IACele.Context.Application.Controls.MainControls>({
    mainControls: null,
    setMainControls: () => null,
});

export default MainControlsContext;
