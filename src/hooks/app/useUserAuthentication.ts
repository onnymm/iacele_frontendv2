import { useContext } from "react"
import { TokenContext } from "../../contexts/tokenContext"
import iaCeleAxios from "../../api/axiosInstance";
import getBackendUrl from "../../api/backendURL";
import { AxiosError, AxiosResponse } from "axios";

/** 
 *  ## Autenticación de usuario
 *  Este custom hook construye una función que utiliza el contexto de token de
 *  la aplicación, realiza la autenticación del usuario desde elformulario de
 *  inicio de sesión y guarda el token en el almacenamiento del navegador para
 *  su futuro uso además de que controla y muestra un error de autenticación en
 *  caso de haberlo.
 *  
 *  ### Parámetros de entrada
 *  Este custom hook no requiere parámetros de entrada.
 *  
 *  ### Retorno
 *  Este custom hook retorna {@link IACele.Core.Security.AuthenticationAction}.
 */ 
const useUserAuthentication = (): IACele.Core.Security.AuthenticationAction => {

    // Obtención de función de cambio de estado del token
    const { setToken } = useContext<IACele.Context.Token>(TokenContext)

    // Función a retornar
    const userLogin: (
        username: string,
        password: string,
        setError: React.Dispatch<React.SetStateAction<string>>,
    ) => (Promise<void>) = async (
        username,
        password,
        setError,
    ) => {
    
        // Configuración de los encabezados
        const config: IACele.Core.Security.AuthenticationHeaders = {
            headers: {
                "accept": "application/json",
                "Content-Type": 'application/x-www-form-urlencoded',
            },
        };
    
        // Configuración de datos
        const d = (
            new URLSearchParams(
                {
                    grant_type: "password",
                    username,
                    password,
                    scope: "",
                    client_id: "string",
                    client_secret: "string",
                },
            )
            .toString()
        );

        try {
            // Obtención del token de autenticación del usuario
            const response = await iaCeleAxios.post<string, AxiosResponse<IACele.API.Response.Authentication>, string>(getBackendUrl('/token/'), d, config);

            // Asignación de token
            setToken(response.data['access_token']);

        } catch ( error ) {

            // Se establece el mensaje de error
            setError(
                (
                    (error as AxiosError<IACele.API.Response.Error, IACele.Core.Security.AuthenticationHeaders>)
                    .response
                    ?.data
                    .detail
                ) as string
            );
        };
    };

    return userLogin;
};

export default useUserAuthentication;
