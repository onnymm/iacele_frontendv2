import { useState } from "react";
import NavbarContext from "../contexts/navbarContext";

const DynamicControlsProvider: React.FC<GenericWrapperComponent> = ({
    children,
}) => {

    // Inicialización de estado de contenido de controles dinámicos
    const [ dynamicControls, setDynamicControls ] = useState<React.JSX.Element | null>(null);

    return (
        <NavbarContext.Provider value={{ dynamicControls, setDynamicControls }}>
            {children}
        </NavbarContext.Provider>
    );
};

export default DynamicControlsProvider;
