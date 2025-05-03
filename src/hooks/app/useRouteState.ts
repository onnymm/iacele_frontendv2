import { useContext, useEffect, useState } from "react";
import RouteMemoryContext from "../../contexts/breadcrumbsContext";

type GenericRecord = {[ key: string ]: any};

/** 
 *  ### Estado guardado en ruta reciente
 *  Este Custom Hook envuelve la inicialización de un estado con el hook
 *  `useState` y guarda el valor más actualizado en los datos de la ruta para
 *  ser recuperado si el usuario regresa a la ruta.
 */ 
const useRouteState: <K, V>(key: K, defaultValue: V) => [V, React.Dispatch<React.SetStateAction<V>>] = (key, defaultValue) => {

    // Obtención de funciones desde contexto
    const { setRouteData, recoverData } = useContext(RouteMemoryContext);

    // Inicialización del estado a retornar
    const [ value, setValue ] = useState(
        () => {
            // Se intenta recuperar un valor guardado en la ruta
            const data = recoverData<GenericRecord>();
            // Si existe el valor se retorna éste
            if ( data[key as string] ) return data[key as string];
            // Si no existe se retorna el valor provisto por defecto
            return defaultValue;
        }
    );

    // Se crea un efecto para guardar el valor en la ruta
    useEffect(
        () => {
            setRouteData(key as string, value);
        }, [setRouteData, key, value]
    );

    // Se retorna el estado y su función de cambio de estado
    return [ value, setValue ] as const;
};

export default useRouteState;
