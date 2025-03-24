import { createContext } from "react";

const SidebarContext = createContext<IACele.Context.SidebarDisplay>({
    isSidebarLocked: false,
    setIsSidebarLocked: () => null,
    isSidebarOpen: false,
    setIsSidebarOpen: () => null,
});

export default SidebarContext;
