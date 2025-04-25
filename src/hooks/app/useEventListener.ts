import React, { useEffect, useRef } from "react";

/** 
 *  ## Añadir escuchador de eventos
 *  Este componente renderiza añade un escuchador de eventos junto con la función
 *   de limpieza del componente cuando éste se desmonta. La única intención de 
 *  este Custom Hook es reducir el tiempo que se ocupa para añadir y eliminar 
 *  el escuchador de eventos en un useEffect manual.
 *  
 *  ### Parámetros de entrada
 *  - [ {@link React.RefObject<HTMLElement>} ] `targetRef`: Referencia del 
 *  objeto HTML en donde se añaadirá el escuchador de eventos.
 *  - [ `keyof` {@link DocumentEventMap} ] `event`: Evento a escuchar.
 *  - [ `undefined` ] `triggerCallback`: Función a ejecutar cuando el evento se
 *  dispara.
 */
const useEventListener = (
    targetRef: React.RefObject<HTMLElement | null> | Window | Document,
    event: keyof DocumentEventMap,
    triggerCallback: EventListener,
) => {

    // Se guarda la función recibida en referencia para evitar renderizaciones innecesarias
    const triggerCallbackRef = useRef(triggerCallback);

    // Actualización de la función si es que ésta cambia
    useEffect(
        () => {
            triggerCallbackRef.current = triggerCallback;
        }, [triggerCallback]
    );

    useEffect(
        () => {
            // Obtención del objeto current de la referencia
            const targetElement = (
                "current" in targetRef
                ? (targetRef as React.RefObject<HTMLElement>).current
                : targetRef as Window | Document
            );
            // Si no existe un objeto, se termina la ejecución
            if ( !targetElement ) return;

            // Obtención de función para uso en escuchador de eventos
            const eventHandler = (event: Event) => triggerCallbackRef.current(event);

            // Se añade el escuchador de eventos
            targetElement.addEventListener(
                event,
                eventHandler,
            );

            // Se crea la función de limpieza para cuando el componente se desmonta
            return (
                () => {
                    // Si el elemento aún existe...
                    if ( !targetElement ) return;
                    // Se remueve el escuchador de eventos
                    targetElement.removeEventListener(
                        event,
                        eventHandler,
                    );
                }
            );
            // Matriz de estados que ejecutan el efecto si éstos cambian
        }, [targetRef, event]
    );
};

export default useEventListener;
