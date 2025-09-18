import { useState } from "react";
import SuperiorControlsContext from "../contexts/superiorControls";

const SuperiorControlsProvider: React.FC<IACele.Application.Provider> = ({
    children,
}) => {

    // Inicialización de estado de controles superiores de la barra de navegación
    const [ superiorControls, setSuperiorControls ] = useState<React.ReactNode | null>(null);

    return (
        <SuperiorControlsContext.Provider value={{ superiorControls, setSuperiorControls }}>
            {children}
        </SuperiorControlsContext.Provider>
    );
};

export default SuperiorControlsProvider;
