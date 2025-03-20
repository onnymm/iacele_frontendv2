import { createContext } from "react";
import userTemplate from "../constants/userTemplate";

export const UserContext = createContext<IACele.Application.CurrentUserData>(userTemplate);