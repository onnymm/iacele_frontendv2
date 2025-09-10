import { createContext } from "react";

const DarkModeContext = createContext<IACeleV2.Context.Application.Theme>({
    darkMode: false,
    setDarkMode: () => (null),
});

export default DarkModeContext;
