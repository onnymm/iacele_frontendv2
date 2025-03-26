import { createContext } from "react";

const AppContentContext = createContext<IACele.Context.AppContent>({
    appContentRef: { current: null },
});

export default AppContentContext;
