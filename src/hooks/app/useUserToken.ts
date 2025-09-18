import { useEffect, useState } from "react";
import useLocalToken from "./useLocalToken";

const useUserToken = (): IACele.Hook.Application.UserToken => {

    // Obtención de funciones para manipulación de token en almacenamiento local
    const { saveToken, loadToken, removeToken } = useLocalToken();
    // Inicialización del valor de token
    const [ userToken, setUserToken ] = useState<string | null>(loadToken);

    // Almacenamiento o remoción del token
    useEffect(
        () => {

            // Si existe un valor de token...
            if ( userToken ) {
                // Se guarda éste en el almacenamiento local
                saveToken(userToken);

            // Si no existe un valor de token...
            } else {
                // Se remueve el token en almacenamiento local
                removeToken();
            };
        }, [saveToken, removeToken, userToken]
    );

    return { userToken, setUserToken };
};

export default useUserToken;
