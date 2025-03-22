import { useEffect, useState } from "react";
import THEME from "../../constants/app/themes";
import LOCAL_STORAGE from "../../constants/app/localStorage";

/**
 *  ## Uso del modo oscuro
 *  Este Custom Hook utiliza el estado del modo oscuro y su interruptor de
 *  encendido y apagado, para usarse como se desee dentro de la aplicación.
 *  
 *  Este custom hook toma la configuración guardada en almacenamiento del
 *  cliente. En caso de no hallarla buscará la configuración por defecto del
 *  navegador.
 *  
 *  ### Parámetros de entrada:
 *  Este Custom Hook no recibe ningún parámetro de entrada.
 *  
 *  ### Retorno
 *  Este Custom Hook retorna:
 *  - [ `boolean` ] `darkMode`: Estado del modo oscuro.
 *  - [ {@link React.Dispatch<React.SetStateAction<boolean>>} ] `useDarkMode`:
 *  Función de cambio de estado del modo oscuro.
 */ 
const useDarkMode: () => (IACele.Context.DarkMode) = () => {

    const [ darkMode, setDarkMode ] = useState<boolean>(
        () => {

            // Se obtiene la configuración del modo oscuro desde el dispositivo
            const storedDarkMode = localStorage.getItem(LOCAL_STORAGE.DARK_MODE) as IACele.Browser.LocalStorage.DarkModeValue;

            // Si existe una configuración guardada se establece ésta
            if ( storedDarkMode !== null ) {

                // Índice para conversión a booleano
                const keyValue = {
                    'false': false,
                    'true': true,
                };

                // Retorno de la configuración guardada, convertida a booleano
                return Boolean( keyValue[storedDarkMode] );
            };

            // En caso de no existir se toma la configuración del tema del dispositivo
            const systemDarkMode = (
                window.matchMedia(
                    '(prefers-color-scheme: dark)'
                )
                .matches
            );

            // Se retorna la preferencia del usuario en el dispositivo
            return systemDarkMode;
        }
    );

    useEffect(
        () => {

            // Si el modo oscuro está activado
            if ( darkMode ) {
                document.documentElement.classList.add(THEME.DARK);
            // Si el modo oscuro está desactivado
            } else {
                document.documentElement.classList.remove(THEME.DARK);
            };

            // Se guarda la configuración actual
            localStorage.setItem(LOCAL_STORAGE.DARK_MODE, String(darkMode));
        }
    );

    // Retorno de estado y función de cambio de estado
    return { darkMode, setDarkMode };
};

export default useDarkMode;
