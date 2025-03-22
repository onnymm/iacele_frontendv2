import { createContext } from "react";

const DarkModeContext = createContext<IACele.Context.DarkMode>({
    darkMode: false,
    setDarkMode: () => null,
});

export default DarkModeContext;
