import DynamicControlsProvider from "./DynamicControlsProvider";
import MainControlsProvider from "./MainControlsProvider";
import PageNameProvider from "./PageNameProvider";
import SidebarProvider from "./SidebarProvider";
import SuperiorControlsProvider from "./SuperiorControlsProvider";

const IACeleProvider: React.FC<IACeleV2.Application.Provider> = ({
    children,
}) => {

    return (
        <DynamicControlsProvider>
            <MainControlsProvider>
                <SuperiorControlsProvider>
                    <SidebarProvider>
                        <PageNameProvider>
                            {children}
                        </PageNameProvider>
                    </SidebarProvider>
                </SuperiorControlsProvider>
            </MainControlsProvider>
        </DynamicControlsProvider>
    );
};

export default IACeleProvider;
