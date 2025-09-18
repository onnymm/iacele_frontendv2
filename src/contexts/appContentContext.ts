import { createContext } from "react";

const AppContentContext = createContext<IACele.Context.Application.Content>({
    appContentRef: { current: null },
});

export default AppContentContext;
