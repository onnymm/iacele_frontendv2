import { createContext } from "react";

const MainControlsContext = createContext<IACele.Context.MainControls>({
    mainControls: null,
    setMainControls: () => null,
});

export default MainControlsContext;
