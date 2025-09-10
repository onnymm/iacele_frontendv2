import { createContext } from "react";

const AppContentContext = createContext<IACeleV2.Context.Application.Content>({
    appContentRef: { current: null },
});

export default AppContentContext;
