import { createContext } from "react";

const SidebarContext = createContext<IACele.Context.Application.Sidebar>({
    isSidebarLocked: false,
    setIsSidebarLocked: () => (null),
    isSidebarOpen: false,
    setIsSidebarOpen: () => (null),
    toggleSidebar: () => (null),
    sidebarRef: {current: null},
    closeSidebar: () => (null),
});

export default SidebarContext;
