import { useState } from "react"

/** 
 *  ## Control de la barra latetal
 *  Este componente renderiza Este Custom Hook crea los estados y funciones de 
 *  estado para controlar la apertura y de la barra lateral así como si la 
 *  apertura está bloqueada o no, controlando la omisión del cierre de la barra 
 *  lateral si ésta se encuentra bloqueada.
 *   
 *  `< tsx >...</ tsx >` Contiene elementos hijos.
 *   
 *  ### Parámetros de entrada
 *  Este componente no requiere parámetros de entrada.
 *  ### Retorno:
 *  Este Custom Hook retorna:
 *  - [ `boolean` ] `isSidebarOpen`: Estado de barra lateral abierta o cerrada.
 *  - [ {@link React.Dispatch<SetStateAction> setState} ] `setIsSidebarOpen`: Función de
 *  cambio de estado de barra lateral abierta o cerrada.
 *  - [ `boolean` ] `isSidebarLocked`: Estado de barra lateral bloqueada.
 *  - [ {@link React.Dispatch<SetStateAction> setState} ] `setIsSidebarLocked`: Función
 *  de cambio de estado de barra lateral bloqueada.
 */
const useSidebar = () => {

    const [ baseIsSidebarOpen, setBaseIsSidebarOpen ] = useState<boolean>(false);
    const [ isSidebarLocked, setIsSidebarLocked ] = useState<boolean>(false);

    // Declaración de función `setIsSidebarOpen` controlada
    const setIsSidebarOpen = (state: boolean | ( (state: boolean) => (boolean) )) => {

        // Si el valor provisto es una función
        if ( typeof state === 'function' ) {
        setBaseIsSidebarOpen(state)

        // Si el valor provisto es booleano
        } else {
            // Control de cierre de la barra lateral si ésta está bloqueada
            if ( !isSidebarLocked && !state ) {
                setBaseIsSidebarOpen(state);
            } else if ( state ) {
                setBaseIsSidebarOpen(state);
            }
        }
    };

    // Retorno de los valores de contexto junto con función de control
    return {
        isSidebarOpen: baseIsSidebarOpen,
        setIsSidebarOpen,
        isSidebarLocked,
        setIsSidebarLocked
    };
};

export default useSidebar;
