import { useCallback, useContext, useEffect, useState } from "react";
import { TokenContext } from "../../contexts/tokenContext";
import APIContext from "../../contexts/apiContext";
import { useNavigate } from "react-router";

const useLogin = (): IACeleV2.Application.Login => {

    // Función para redireccionar cuando el usuario se autentique
    const navigate = useNavigate();
    // Obtención de valores del contexto
    const { userToken } = useContext(TokenContext);
    // Obtención de la instancia de API
    const { api } = useContext(APIContext);
    // Inicialización de estado de error
    const [ errorMessage, setErrorMessage ] = useState<string | undefined>();

    // Inicialización de función para inicio de sesión
    const login = useCallback(
        async (event: React.FormEvent<HTMLFormElement>) => {

            // Prevención de comportamiento prestablecido
            event.preventDefault();
            // Obtención de los valores del formulario
            const { username, password } = Object.fromEntries(new FormData(event.currentTarget));

            // Se realiza intento de inicio de sesión
            await api.auth.authenticate(
                username as string,
                password as string,
                setErrorMessage,
            );
        }, [api, setErrorMessage]
    );

    // Cuando se establezca un valor de token se navega hacia el inicio
    useEffect(
        () => {
            if ( userToken ) navigate('/');
        }, [userToken, navigate]
    );

    return { errorMessage, login };
};

export default useLogin;
