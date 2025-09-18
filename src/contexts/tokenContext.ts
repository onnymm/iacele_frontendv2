import { createContext } from "react";

export const TokenContext = createContext<IACele.Context.Application.UserToken>({
    userToken: null,
    setUserToken: () => null,
});
