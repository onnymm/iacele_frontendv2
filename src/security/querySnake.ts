import { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import toSnake from "../api/toSnake";

/** 
 *  ## Parámetros query a Snake Case
 *  Este interceptor convierte las llaves de los parámetros query a Snake Case
 *  para ser leídos correctamente por el backend.
 */ 
const snakeQuery = (config: AxiosRequestConfig): InternalAxiosRequestConfig => {

    // Este interceptor solo aplica en parámetros query
    if ( config.params ) {
        // Inicialización de nuevo objeto de parámetros Query
        const processedParams: Record<string, string | number | boolean | null> = {};
        // Se almacenan las llaves originales para su apropiado mapeo
        const initialKeys = Object.keys(config.params);

        // Iteración por llave para obtención del valor que le corresponde
        initialKeys.forEach(
            (key) => {
                processedParams[toSnake(key)] = config.params[key];
            }
        );
        config.params = processedParams;
    };

    return config as InternalAxiosRequestConfig;
};

export default snakeQuery;
