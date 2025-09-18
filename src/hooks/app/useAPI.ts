import { useContext, useMemo, useState } from "react";
import { TokenContext } from "../../contexts/tokenContext";
import { UserContext as UserDataContext } from "../../contexts/userContext";
import Client from "../../api/client/client";

export interface APIParams extends IACele.Application.Loading {
    /**
     *  ### Conexión con el backend
     *  Instancia que maneja la transacción de datos entre el frontend y el servidor.
     */ 
    api: Client;
};

const useAPI = (): APIParams => {

    // Obtención de función de cambio de estado desde el token
    const { setUserToken } = useContext(TokenContext);
    const { setUserData, removeUserData } = useContext(UserDataContext);
    // Inicialización de estado de carga
    const [ appLoading, setAppLoading ] = useState<boolean>(false);

    // Inicialización de instancia de la API
    const api = useMemo(
        () => (
            new Client(setAppLoading, setUserToken, setUserData, removeUserData)
        ), [setUserToken, setUserData, removeUserData]
    );

    // Se retornan el estado y la instancia creada
    return { appLoading, setAppLoading, api };
};

export default useAPI;
