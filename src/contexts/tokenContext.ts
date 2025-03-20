import { createContext } from "react";

export const TokenContext = createContext<IACele.Context.Token>({
    token: null,
    setToken: () => null,
});
