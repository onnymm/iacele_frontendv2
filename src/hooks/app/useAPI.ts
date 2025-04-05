import { useContext, useMemo } from "react"
import AppLoadingContext from "../../contexts/appLoadingContext"
import APIManager from "../../api/api";

/**
 *  ## Instancia de API del backend
 *  Este Custom Hook retorna la instancia para conectarse a la API del backend
 *  y manejar solicitudes y respuestas.
 *  
 *  ### Retorno
 *  Este Custom Hook retorna:
 *  - [ {@link APIManager} ] `api`: Instancia de la API del backend
 */
const useAPI = (): APIManager => {

    // Obtención de función de cambio de estado desde el contexto
    const { setAppLoading } = useContext(AppLoadingContext);

    // Inicialización de instancia de la API
    const api = useMemo(
        () => (
            new APIManager(setAppLoading)
        ), [setAppLoading]
    );

    // Se retorna la instancia
    return api;
};

export default useAPI;
