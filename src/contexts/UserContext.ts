import { createContext } from "react";
import userTemplate from "../constants/userTemplate";

export const UserContext = createContext<IACeleV2.Context.Application.UserData>({
    userData: userTemplate,
    setUserData: () => (null),
    removeUserData: () => (null),
});
