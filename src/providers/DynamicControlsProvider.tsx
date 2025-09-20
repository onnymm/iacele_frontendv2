import { useState } from "react";
import DynamicControlsContext from "../contexts/dynamicControlsContext";

const DynamicControlsProvider: React.FC<GenericWrapperComponent> = ({
    children,
}) => {

    // Inicialización de estado de contenido de controles dinámicos
    const [ dynamicControls, setDynamicControls ] = useState<React.JSX.Element | null>(null);

    return (
        <DynamicControlsContext.Provider value={{ dynamicControls, setDynamicControls }}>
            {children}
        </DynamicControlsContext.Provider>
    );
};

export default DynamicControlsProvider;
