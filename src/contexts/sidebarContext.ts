import { createContext } from "react";

const SidebarContext = createContext<IACeleV2.Context.Application.Sidebar>({
    isSidebarLocked: false,
    setIsSidebarLocked: () => (null),
    isSidebarOpen: false,
    setIsSidebarOpen: () => (null),
    toggleSidebar: () => (null),
    sidebarRef: {current: null},
});

export default SidebarContext;
