import { createContext } from "react";

const NavbarContext = createContext<IACele.Context.Application.Controls.DynamicControls>({
    dynamicControls: null,
    setDynamicControls: () => (null),
});

export default NavbarContext;
