import axios, { AxiosError, AxiosResponse } from "axios";
import getBackendUrl from "../../core/backendURL";
import Client from "../client";
import API_PATH from "../../../constants/api/apiPath";
import iaCeleAxios from "../../core/axiosInstance";

class Auth {

    private main: Client;
    private config: IACeleV2.Security.Authentication.Headers = {
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    };

    constructor (
        main: Client,
    ) {

        // Se asigna la referencia de la instancia principal
        this.main = main;
    };

    authenticate = async (
        username: string,
        password: string,
        setError: React.Dispatch<React.SetStateAction<string | undefined>>,
    ) => {

        // Creación de los datos
        const data = (
            new URLSearchParams(
                {
                    'grant_type': 'password',
                    'username': username,
                    'password': password,
                    'scope': '',
                    'client_id': 'string',
                    'client_secret': 'string',
                },
            )
            .toString()
        );

        try {
            // Obtención del token de autenticación del usuario
            const response = await iaCeleAxios.post<string, AxiosResponse<IACeleV2.API.Request.Authentication>, string>(
                getBackendUrl(API_PATH.TOKEN),
                data,
                this.config,
            );

            // Obtención del token de usuario
            const token = response.data['access_token'];
            // Asignación del token al estado
            this.main.setUserToken(token);

        // Si ocurrió un error al autenticar
        } catch ( error ) {

            // Se obtiene el código de error
            const errorMessage = (
                (
                    ( error as AxiosError<IACeleV2.API.Response.Error, IACeleV2.Security.Authentication.Headers> )
                    .response
                    ?.data
                    .detail
                ) as string
            );

            // Se establece el código de error
            setError(errorMessage);
        };
    };

    fetchUser = async (
        token: string | null,
    ) => {

        // Si no existe un token de usuario...
        if ( !token ) {
            // Se usa la plantilla predefinida para evitar errores
            this.main.removeUserData();

            return;
        };

        try {

            // Intento de obtención de los datos
            const userData = await this.main.get<undefined, IACeleV2.Application.CurrentUserData>(
                API_PATH.ME,
                undefined,
            );

            // Se establece el valor en el estado
            this.main.setUserData(userData);

        // Si hubo un error al autenticar...
        } catch ( error ) {

            if ( axios.isAxiosError(error) && error.code === "ERR_BAD_REQUEST" ) {
                this.main.setUserToken(null);
                this.main.removeUserData();
            };
        };
    };

};

export default Auth;
