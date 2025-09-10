import { useState } from "react";
import MainControlsContext from "../contexts/mainControlsContext";

const MainControlsProvider: React.FC<IACeleV2.Application.Provider> = ({
    children,
}) => {

    // Inicialización de contenido de controles principales de barra de navegación
    const [ mainControls, setMainControls ] = useState<React.ReactNode | null>(null);

    return (
        <MainControlsContext.Provider value={{ mainControls, setMainControls }}>
            {children}
        </MainControlsContext.Provider>
    );
};

export default MainControlsProvider;
