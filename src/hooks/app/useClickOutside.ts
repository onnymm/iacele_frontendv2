import { useCallback } from "react"
import useEventListener from "./useEventListener"

const useClickOutside = (
    ref: React.RefObject<HTMLElement | null>,
    callback: () => (void)
) => {

    // Función a añadir en el escuchador de eventos
    const handleClick = useCallback(
        (event: MouseEvent) => {
            // Validación del clic
            if ( ref && ref.current && !ref.current.contains(event.target as Node) ) {
                // Ejecución de la función provista
                callback();
            };
        }, [callback, ref]
    );

    // Se añade un escuchador de eventos de clic al documento
    useEventListener(
        document,
        'mousedown',
        handleClick as EventListener,
    );
};

export default useClickOutside;
