import { useCallback, useRef, useState } from "react"
import useClickOutside from "./useClickOutside";

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
 */ 
const useSidebar = (): IACele.Hook.Application.Sidebar => {

    // Inicialización de estado de barra lateral abierta
    const [ isSidebarOpen, setIsSidebarOpen ] = useState<boolean>(false);
    // Inicialización de estado de barra lateral bloqueada
    const [ isSidebarLocked, setIsSidebarLocked ] = useState<boolean>(false);

    //Inicilización de referencia para la barra lateral
    const sidebarRef = useRef<HTMLElement>(null);

    // Inicializaciónd de función de interruptor de barra lateral abierta
    const toggleSidebar = useCallback(
        () => {

            // Cambio de estado de barra lateral abierta
            setIsSidebarOpen( (value) => (!value) );
        }, []
    );

    // Función para cerrar la barra lateral cuando se hace un clic por fuera y ésta está desbloqueada
    const handleClickOutside = useCallback(
        () => {

            // Si la barra lateral no está bloqueada...
            if ( !isSidebarLocked ) {
                // Se cierra la barra lateral
                setIsSidebarOpen(false);
            };
        }, [isSidebarLocked]
    );

    // Uso de hook para desencadenar efecto de clic fuera
    useClickOutside(sidebarRef, handleClickOutside);

    return { isSidebarOpen, setIsSidebarOpen, isSidebarLocked, setIsSidebarLocked, toggleSidebar, sidebarRef };
};

export default useSidebar;
