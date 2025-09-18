import { useCallback, useState } from "react";

const useAlert = (): IACele.Hook.View.Form.Alert => {

    // Inicialización de estado que cierra el componente.
    const [ show, setShow ] = useState<boolean>(true);

    // Inicialización de función que cierra el componente
    const close = useCallback(
        () => {
            setShow(false);
        }, []
    );

    return { show, close };
};

export default useAlert;
