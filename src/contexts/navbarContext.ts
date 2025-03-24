import { createContext } from "react";

const NavbarContext = createContext<IACele.Context.Navbar>({
    dynamicControls: null,
    setDynamicControls: () => null,
});

export default NavbarContext;
