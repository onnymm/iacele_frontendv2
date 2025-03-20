import { useContext } from "react"
import { TokenContext } from "../../contexts/tokenContext"
import iaCeleAxios from "../../api/axiosInstance";
import getBackendUrl from "../../api/backendURL";

const useUserAuthentication = (): IACele.Core.Security.AuthenticationAction => {

    // Obtención de función de cambio de estado del token
    const { setToken } = useContext<IACele.Context.Token>(TokenContext)

    const userLogin: (
        username: string,
        password: string,
    ) => (Promise<boolean>) = async (
        username,
        password,
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
            const response = await iaCeleAxios.post(getBackendUrl('/token/'), d, config);
            // Asignación de token
            setToken(response.data['access_token']);
            return true;
        } catch {
    
            // Retorno de autenticación fallida
            return false;
        }
    };

    return userLogin;
};

export default useUserAuthentication;
