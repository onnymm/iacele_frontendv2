import axios from "axios";
import tokenInterceptor from "../security/tokenInterceptor";
import snakeQuery from "../security/querySnake";

// Inicialización de instancia modificada de Axios
const iaCeleAxios = axios.create();

// Registro de interceptors
iaCeleAxios.interceptors.request.use(tokenInterceptor);
iaCeleAxios.interceptors.request.use(snakeQuery);

// Exportación de la instancia
export default iaCeleAxios;
