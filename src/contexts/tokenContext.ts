import { createContext } from "react";

export const TokenContext = createContext<IACeleV2.Context.Application.UserToken>({
    userToken: null,
    setUserToken: () => null,
});
