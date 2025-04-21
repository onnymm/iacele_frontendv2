import { useContext, useEffect, useState } from "react";
import APIContext from "../../contexts/apiContext";

/** 
 *  ## Estado deshabilitado por carga de la aplicación
 *  Este Custom Hook crea un estado y función de cambio de estado booleano para
 *  deshabilitar o habilitar un componente en base a validaciones específicas
 *  es éste o si el estado de carga de la aplicación está activo. Todos los
 *  componentes que usen un estado creado a partir de este Custom Hook se
 *  deshabilitarán cuando la aplicación entre en un estado de carga por
 *  obtención de datos desde el backend, independientemente si el estado de
 *  deshabilitado en éstos sea activo o no.
 *  
 *  ### Parámetros de entrada
 *  - [ `boolean` ] `condition`: Condición a evaluar para activar o no el
 *  estado de deshabilitado.
 *  
 *  ### Retorno:
 *  Este Custom Hook retorna una matriz de dos valores:
 *  - Un estado booleano.
 *  - Una función de cambio de estado.
 */ 
const useAsyncDisabled = (
    condition: boolean | undefined,
) => {

    // Obtención de estado de carga de la aplicación desde el contexto
    const { appLoading } = useContext(APIContext);

    // Inicialización de estado base de deshabilitado
    const [ baseDisabled, setBaseDisabled ] = useState<boolean>(condition ?? false);
    // Inicialización de estado computado de deshabilitado
    const [ computedDisabled, setComputedDisabled ] = useState<boolean>(appLoading || baseDisabled);

    // Manejo de estado computado de deshabilitado
    useEffect(
        () => {
            setComputedDisabled(appLoading || condition === true);
        }, [appLoading, condition]
    );

    return [ computedDisabled, setBaseDisabled ] as const;
};

export default useAsyncDisabled;
