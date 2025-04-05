import { AxiosResponse } from "axios";
import iaCeleAxios from "./axiosInstance";
import getBackendUrl from "./backendURL";
import API_PATH from "../constants/api/apiPath";

type IACeleResponse<T extends IACele.API.DataTypes.GenericRecord> = AxiosResponse<IACele.API.Response.Records<T>>

// ----------------------------------------------------------------------------

class APIManager {

    private _setAppLoading: IACele.Context.AppLoading['setAppLoading'];

    constructor (
        setAppLoading: IACele.Context.AppLoading['setAppLoading'],
    ) {
        this._setAppLoading = setAppLoading;
    };

    /** 
     *  ## Lectura de registro
     *  Este método permite leer un registro en base a una tabla de la base de
     *  datos y una ID provista.
     *  Parámetros de entrada:
     *  
     *  ### Parámetros de entrada
     *  - [ {@link IACele.API.Database.TableName} ] `tableName`: Nombre de la tabla
     *  en la base de datos.
     *  - [ `number` ] `id`: ID del registro a leer.
     */ 
    read = async<K extends keyof IACele.API.Database.Table>({
        tableName,
        id,
    }: IACele.API.Request.Read) => {

        return await this.execute(
            async () => {
                const response = await iaCeleAxios.get<string, AxiosResponse<IACele.API.Database.Table[K][]>, IACele.API.Request.Read>(
                    getBackendUrl(API_PATH.READ),
                    {
                        params: {
                            'record_ids': id,
                            'table_name': tableName,
                        },
                        authenticate: true,
                    }
                );

                // Destructuración del registro a retornar
                const [ record ] = response.data;
                return (record);
            }
        );
    };

    /** 
     *  ## Búsqueda y visualización de registros
     *  Este método permite buscar y leer registros desde una tabla en la base de
     *  datos del backend.
     *  Parámetros de entrada:
     *  
     *  ### Parámetros de entrada
     *  - [ {@link IACele.API.Database.TableName} ] `tableName`: Nombre de la tabla
     *  en la base de datos.
     *  - [ {@link IACele.API.Data.CriteriaStructure} ] `searchCriteria`: Criterio
     *  de búsqueda (opcional).
     *  - [ `string[]` ] `fields`: Campos específicos a visualizar en los
     *  resultados arrojados (opcional).
     *  - [ `number` ] `offset`: Desfase de índice de registros a visualizar
     *  (opcional).
     *  - [ `number` ] `limit`: Cantidad máxima de registros a visualizar
     *  (opcional).
     *  - [ `string | string[]` ] `sortby`: Campo o campos como criterio de
     *  ordenamiento de registros (opcional).
     *  - [ `boolean | boolean[]` ]  ascending: Dirección de ordenamiento
     *  ascendente (opcional).
     */ 
    searchRead = async<T extends IACele.API.DataTypes.GenericRecord = IACele.API.DataTypes.GenericRecord> (
        {
            tableName,
            searchCriteria = [],
            fields = [],
            offset = undefined,
            limit = undefined,
            sortby= undefined,
            ascending = undefined,
        }: IACele.API.Request.SearchRead,
    ) => {

        return await this.execute(
            async () => {
                const response = await iaCeleAxios.post<string, IACeleResponse<T>, IACele.API.Request.SearchRead>(
                    getBackendUrl(API_PATH.SEARCH_READ),
                    {
                        tableName,
                        searchCriteria,
                        fields,
                        offset,
                        limit,
                        sortby,
                        ascending,
                    },
                    { authenticate: true }
                );

                return (response.data);
            }
        );
    };

    /** 
     *  ## Actualización de registros
     *  Este método realiza la actualización de un registro a partir de su
     *  respectiva ID provista, actualizando uno o más campos con el valor
     *  provisto. Este método solo sobreescribe un mismo valor por cada campo a
     *  todos los registros provistos.
     *  
     *  ### Parámetros de entrada
     *  Los parámetros de entrada son:
     *  - [ {@link IACele.API.Database.TableName} ] `tableName`: Nombre de la tabla
     *  en donde se harán los cambios.
     *  - [ `number | number[]` ] `recordIds`: ID o lista de IDs a actualizar.
     *  - [ {@link Record<string, IACele.View.RecordValue>} ] `data`: Diccionario
     *  de valores a modificar masivamente.
     */ 
    update = async ({
        tableName,
        recordId,
        dataToWrite,
    }: IACele.API.Request.Update) => {

        return await this.execute(
            async () => {
                const response = await iaCeleAxios.patch<string, AxiosResponse<boolean>, IACele.API.Request.Update>(
                    getBackendUrl(API_PATH.UPDATE),
                    {
                        tableName,
                        recordId,
                        dataToWrite,
                    },
                    { authenticate: true }
                );

                return (response.data);
            }
        );
    };

    /** 
     *  ## Obtención de registros para vista de tabla
     *  Este método permite buscar y leer registros desde una tabla en la base de
     *  datos del backend y realizar acciones de paginación.
     *  
     *  ### Parámetros de entrada
     *  - [ {@link IACele.API.Database.TableName} ] `tableName`: Nombre de la tabla
     *  en la base de datos.
     *  - [ {@link IACele.API.Data.CriteriaStructure} ] `searchCriteria`: Criterio
     *  de búsqueda (opcional).
     *  - [ `string[]` ] `fields`: Campos específicos a visualizar en los
     *  resultados arrojados (opcional).
     *  - [ `number` ] `page`: Página de fragmento de registros a retornar.
     *  - [ `number` ] `itemsPerPage`: Cantidad de registros a visualizar (opcional).
     *  - [ `string | string[]` ] `sortby`: Campo o campos como criterio de
     *  ordenamiento de registros (opcional).
     *  - [ `boolean | boolean[]` ]  ascending: Dirección de ordenamiento
     *  ascendente (opcional).
     */ 
    getDataForTable = async<T extends IACele.API.DataTypes.GenericRecord = IACele.API.DataTypes.GenericRecord> ({
        tableName,
        searchCriteria = [],
        fields = [],
        page = 0,
        itemsPerPage = 40,
        sortby,
        ascending = true,
    }: IACele.API.Request.TreeSearchRead) => {

        return await this.execute(
            async () => {
                // Cálculo del desfase de registros
                const offset = page * itemsPerPage
                // Se usa el valor de registros por página para el límite
                const limit = itemsPerPage

                // Se convierte el valor a snake_case
                if ( typeof sortby === 'string' ) {
                    sortby = this.toSnake(sortby)
                } else if ( typeof sortby === 'object') {
                    sortby = sortby.map( (key) => this.toSnake(key) )
                }

                const response = await iaCeleAxios.post<string, IACeleResponse<T>, IACele.API.Request.SearchRead>(
                    getBackendUrl(API_PATH.SEARCH_READ),
                    {
                        tableName,
                        searchCriteria,
                        fields,
                        offset,
                        limit,
                        sortby,
                        ascending,
                    },
                    { authenticate: true }
                );

                return (response.data);
            }
        )
    };

    private toSnake = (text: string) => {
        return ( text.replace(/([A-Z])/, '_$1').toLowerCase() );
    };

    private execute = async <T>( callback: () => Promise<T> ) => {
        // Se establece el estado de carga a verdadero
        this._setAppLoading(true);
        // Obtención de los datos desde el backend
        const data = await callback();
        // Se establece el estado de carga a falso
        return data;
    };
};

export default APIManager;
