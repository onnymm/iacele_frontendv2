import { createContext } from "react";

const AppLoadingContext = createContext<IACele.Context.AppLoading>({
    appLoading: false,
    setAppLoading: () => null,
});

export default AppLoadingContext;
