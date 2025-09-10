import { useContext } from "react"
import SidebarContext from "../../../contexts/sidebarContext";
import ButtonLockSidebar from "./ButtonLockSidebar";
import CloseSidebarButton from "./CloseSidebarButton";
import SidebarMenu from "./SidebarMenu";
import APP_NAME from "../../../constants/app/name";

const Sidebar = (): (React.JSX.Element) => {

    // Obtención de valores desde el contexto
    const { isSidebarOpen, isSidebarLocked, sidebarRef } = useContext(SidebarContext);

    return (
        <div id="sidebar-action" className={`${isSidebarOpen && !isSidebarLocked ? 'bg-black/50' : 'pointer-events-none'} top-0 z-50 absolute size-full transition-colors text-white`}>
            <aside ref={sidebarRef} className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-[18rem]'} bg-[#162230] top-0 flex flex-col gap-2 absolute w-72 pointer-events-auto transition duration-300 pb-4 h-full`}>
                <div className="flex sm:flex-row flex-row-reverse justify-between items-center px-2 w-72 h-20">
                    <h1 id="navbar-logo" className="flex justify-center items-center size-full">{APP_NAME}</h1>
                    <CloseSidebarButton />
                </div>
                <SidebarMenu />

                {/* Pie de barra lateral */}
                <div className="flex justify-end px-4 h-10">
                    <ButtonLockSidebar />
                </div>
            </aside>
        </div>
    );
};

export default Sidebar;
