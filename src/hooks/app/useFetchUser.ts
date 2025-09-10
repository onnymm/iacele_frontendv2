import { useCallback, useContext, useEffect } from "react";
import APIContext from "../../contexts/apiContext";
import { TokenContext } from "../../contexts/tokenContext";

const useFetchUser = (): void => {

    // Obtención de la instancia de API desde el contexto
    const { api } = useContext(APIContext);
    // Obtención del valor del token
    const { userToken } = useContext(TokenContext);

    // Inicialización de función para obtención de los datos de usuario actual
    const fetchUser = useCallback(
        async () => {

            // Obtención de los datos
            await api.auth.fetchUser(userToken);
        }, [api, userToken]
    );

    // Intento de obtención de los datos del usuario actual
    useEffect(
        () => {
            fetchUser();
        }, [fetchUser]
    );
};

export default useFetchUser;
