import axios, { AxiosError, AxiosResponse } from "axios";
import getBackendUrl from "../core/backendURL";
import Form from "./modules/form";
import Tree from "./modules/tree";
import Server from "./modules/server";
import Auth from "./modules/auth";
import iaCeleAxios from "../core/axiosInstance";
import { addToast } from "@heroui/react";

class Client {

    private setAppLoading: IACele.Application.Loading['setAppLoading'];
    setUserToken: IACele.Application.UserToken['setUserToken'];
    setUserData: React.Dispatch<React.SetStateAction<IACele.Application.CurrentUserData>>;
    removeUserData: () => void;
    form: Form;
    tree: Tree;
    server: Server;
    auth: Auth;

    constructor (
        setAppLoading: IACele.Application.Loading['setAppLoading'],
        setUserToken: IACele.Application.UserToken['setUserToken'],
        setUserData: React.Dispatch<React.SetStateAction<IACele.Application.CurrentUserData>>,
        removeUserData: () => void,
    ) {
        // Se asignan las referencia de funciones de cambio de estado
        this.setAppLoading = setAppLoading;
        this.setUserToken = setUserToken;
        this.setUserData = setUserData;
        this.removeUserData = removeUserData;
        // Se inicializa el módulo de formulario
        this.form = new Form(this);
        // Se inicializa el módulo de árbol
        this.tree = new Tree(this);
        // Se inicializa el módulo de servidor
        this.server = new Server(this);
        // Se inicializa el módulo de autenticación
        this.auth = new Auth(this);
    };

    get = async <S, R>(
        path: string,
        data: S,
    ): Promise<R> => {

        // Ejecución del método GET
        return this.execute(
            async () => {
                // Solicitud de datos
                const response = await iaCeleAxios.get<string, AxiosResponse<R>, S>(
                    getBackendUrl(path),
                    {
                        data,
                        authenticate: true,
                    },
                );

                // Retorno de los datos obtenidos del endpoint
                return response.data;
            }
        );
    };

    post = async <S, R>(
        path: string,
        data: S,
    ): Promise<R> => {

        // Ejecución del método POST
        return this.execute(
            async () =>  {
                // Solicitud de datos
                const response = await iaCeleAxios.post<string, AxiosResponse<R>, S>(
                    getBackendUrl(path),
                    data,
                    { authenticate: true },
                );

                // Retorno de los datos obtenidos del endpoint
                return response.data;
            }
        );
    };

    patch = async <S, R>(
        path: string,
        data: S,
    ): Promise<R> => {

        // Ejecución del método PATCH
        return this.execute(
            async () =>  {
                // Solicitud de datos
                const response = await iaCeleAxios.patch<string, AxiosResponse<R>, S>(
                    getBackendUrl(path),
                    data,
                    { authenticate: true },
                );

                // Retorno de los datos obtenidos del endpoint
                return response.data;
            }
        );
    };

    delete = async <S>(
        path: string,
        data: S,
    ): Promise<boolean> => {

        // Ejecución del método DELETE
        return this.execute(
            async () =>  {
                // Solicitud de datos
                const response = await iaCeleAxios.delete<string, AxiosResponse<boolean>, S>(
                    getBackendUrl(path),
                    {
                        data: {
                            ...data,
                            ...{ authenticate: true },
                        }
                    }
                );

                // Retorno de los datos obtenidos del endpoint
                return response.data;
            }
        );
    };

    execute = async <T>(
        callback: () => Promise<T>,
    ) => {
        // Se establece el estado de carga a verdadero
        this.setAppLoading(true);
        try {
            // Obtención de los datos desde el backend
            const data = await callback();

            return data;
        } catch ( e ) {

            // Tipado para Axios
            if ( axios.isAxiosError(e) ) {
                // Se muestra el error en la interfaz
                this.displayError(e)
            };

            // Se lanza el error
            throw e;

        } finally {
            // Se establece el estado de carga a falso
            this.setAppLoading(false);
        };

    };

    displayError = (
        error: AxiosError<IACele.API.Response.Error>,
    ) => {

        // Se lanza notificación
        addToast({
            title: 'Ocurrió un error',
            description: error.response?.data.detail,
            color: 'danger',
            variant: 'solid',
            radius: 'sm'
        });
    };
};

export default Client;
