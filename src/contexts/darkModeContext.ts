import { createContext } from "react";

const DarkModeContext = createContext<IACele.Context.Application.Theme>({
    darkMode: false,
    setDarkMode: () => (null),
});

export default DarkModeContext;
