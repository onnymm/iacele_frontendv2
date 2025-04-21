import { useMemo, useState } from "react";
import APIManager from "../../api/api";

export interface APIParams {
    /**
     *  ### Conexión con el backend
     *  Instancia que maneja la transacción de datos entre el frontend y el servidor.
     */ 
    api: APIManager;
    /** 
     *  ### Estatus de carga de la app
     *  Este estado contiene el estatus de carga de la aplicación. Éste cambia
     *  cuando se realiza una solicitud de datos al backend.
     */ 
    appLoading: boolean;
    /** 
     *  ### Función de cambio de estado de carga de la app
     *  Esta función realiza el cambio de estado de carga de la aplicación.
     */ 
    setAppLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
const useAPI = (): APIParams => {

    // Inicialización de estado de carga
    const [ appLoading, setAppLoading ] = useState<boolean>(false);

    // Inicialización de instancia de la API
    const api = useMemo(
        () => (
            new APIManager(setAppLoading)
        ), []
    );

    // Se retornan el estado y la instancia creada
    return { appLoading, setAppLoading, api };
};

export default useAPI;
