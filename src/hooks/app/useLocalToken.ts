import { useCallback } from "react";
import LOCAL_STORAGE from "../../constants/app/localStorage";

const useLocalToken = (): IACeleV2.Hook.Application.LocalToken => {

    // Inicialización de función para guardar token en el almacenamiento local
    const saveToken = useCallback(
        (token: string) => {

            // Se guarda el token en el almacenamiento local
            localStorage.setItem(LOCAL_STORAGE.USER_TOKEN, token );
        }, []
    );
    // Inicialización de función para cargar token desde el almacenamiento local
    const loadToken = useCallback(
        (): string | null => {

            // Obtención del token desde el almacenamiento local
            const token = localStorage.getItem(LOCAL_STORAGE.USER_TOKEN);

            return token;
        }, []
    );

    // Inicialización de función para remover el token en el almacenamiento local
    const removeToken = useCallback(
        () =>  {

            // Se remueve el valor de token guardado en el almacenamiento local
            localStorage.removeItem(LOCAL_STORAGE.USER_TOKEN);
        }, []
    );

    return { saveToken, loadToken, removeToken };
};

export default useLocalToken;
