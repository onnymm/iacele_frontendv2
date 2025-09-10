import { createContext } from "react";

const NavbarContext = createContext<IACeleV2.Context.Application.Controls.DynamicControls>({
    dynamicControls: null,
    setDynamicControls: () => (null),
});

export default NavbarContext;
