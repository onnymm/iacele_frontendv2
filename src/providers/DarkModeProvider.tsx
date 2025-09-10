import DarkModeContext from "../contexts/darkModeContext";
import useDarkMode from "../hooks/app/useDarkMode";

const DarkModeProvider: React.FC<IACeleV2.Application.Provider> = ({
    children,
}) => {

    // Obtención de valores para proveedor de contexto
    const { darkMode, setDarkMode } = useDarkMode();

    return (
        <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};

export default DarkModeProvider;
