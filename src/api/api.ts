import { AxiosResponse } from "axios";
import iaCeleAxios from "./axiosInstance";
import getBackendUrl from "./backendURL";
import API_PATH from "../constants/api/apiPath";

type IACeleResponse<T extends IACele.API.DataTypes.GenericRecord> = AxiosResponse<IACele.API.Response.Records<T>>

// ----------------------------------------------------------------------------

class APIManager {

    /** 
     *  ### Cambio de estado de carga de la aplicación
     *  Esta función cambia el estado de carga de toda la aplicación, para
     *  renderizar componentes visuales que se lo indican al usuario.
     */ 
    private _setAppLoading: IACele.Context.API['setAppLoading'];

    constructor (
        setAppLoading: IACele.Context.API['setAppLoading'],
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
     *  - [ {@link IACele.API.Database.TableName TableName} ] `table`: Nombre de la
     *  tabla en la base de datos.
     *  - [ `number` ] `id`: ID del registro a leer.
     */ 
    read = async<K extends keyof IACele.API.Database.Table>({
        table,
        recordIds,
    }: IACele.API.Request.Read) => {

        return await this.execute(
            async () => {
                const response = await iaCeleAxios.get<string, AxiosResponse<IACele.View.RecordInDatabase<K>[]>, IACele.API.Request.Read>(
                    getBackendUrl(API_PATH.READ),
                    {
                        params: {
                            recordIds,
                            table,
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
     *  - [ {@link IACele.API.Database.TableName TableName} ] `table`: Nombre de
     *  la tabla en la base de datos.
     *  - [ {@link IACele.API.Data.CriteriaStructure CriteriaStructure} ]
     *  `searchCriteria`: Criterio de búsqueda (opcional).
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
    searchRead = async<K extends IACele.API.Database.TableName> (
        {
            table,
            searchCriteria = [],
            fields = [],
            offset = undefined,
            limit = undefined,
            sortby= undefined,
            ascending = undefined,
        }: IACele.API.Request.SearchRead<K>,
    ) => {

        return await this.execute(
            async () => {
                const response = await iaCeleAxios.post<string, IACeleResponse<IACele.View.RecordInDatabase<K>>, IACele.API.Request.SearchRead<K>>(
                    getBackendUrl(API_PATH.SEARCH_READ),
                    {
                        table,
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
     *  - [ {@link IACele.API.Database.TableName TableName} ] `table`: Nombre de la
     *  tabla en donde se harán los cambios.
     *  - [ `number | number[]` ] `recordIds`: ID o lista de IDs a actualizar.
     *  - [ {@link IACele.View.RecordInDatabase RecordInDatabase} ] `data`:
     *  Diccionario de valores a modificar masivamente.
     */ 
    update = async ({
        table,
        recordId,
        dataToWrite,
    }: IACele.API.Request.Update) => {

        return await this.execute(
            async () => {
                const response = await iaCeleAxios.patch<string, AxiosResponse<boolean>, IACele.API.Request.Update>(
                    getBackendUrl(API_PATH.UPDATE),
                    {
                        table,
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
     *  ## Eliminación de registro
     *  Este método permite eliminar un registro de la base de datos en base a una
     *  tabla y una ID provista.
     *  
     *  ### Parámetros de entrada
     *  - [ {@link IACele.API.Database.TableName TableName} ] `table`: Nombre de la
     *  tabla en la base de datos.
     *  - [ `number` ] `id`: ID del registro a eliminar.
     */ 
    delete = async ({
        table,
        recordIds,
    }: IACele.API.Request.Read) => {

        return await this.execute(
            async () => {
                const response = await iaCeleAxios.delete<string, AxiosResponse<boolean>, IACele.API.Request.Read>(
                    getBackendUrl(API_PATH.READ),
                    {
                        params: {
                            recordIds,
                            table,
                        },
                        authenticate: true,
                    }
                );

                return response.data;
            }
        );
    };

    /** 
     *  ## Obtención de registros para vista de tabla
     *  Este método permite buscar y leer registros desde una tabla en la base de
     *  datos del backend y realizar acciones de paginación.
     *  
     *  ### Parámetros de entrada
     *  - [ {@link IACele.API.Database.TableName TableName} ] `table`: Nombre de la
     *  tabla en la base de datos.
     *  - [ {@link IACele.API.Data.CriteriaStructure CriteriaStructure} ]
     *  `searchCriteria`: Criterio de búsqueda (opcional).
     *  - [ `string[]` ] `fields`: Campos específicos a visualizar en los
     *  resultados arrojados (opcional).
     *  - [ `number` ] `page`: Página de fragmento de registros a retornar.
     *  - [ `number` ] `itemsPerPage`: Cantidad de registros a visualizar (opcional).
     *  - [ `string | string[]` ] `sortby`: Campo o campos como criterio de
     *  ordenamiento de registros (opcional).
     *  - [ `boolean | boolean[]` ]  ascending: Dirección de ordenamiento
     *  ascendente (opcional).
     */ 
    getDataForTable = async<K extends IACele.API.Database.TableName> ({
        table,
        searchCriteria = [],
        fields = [],
        page = 0,
        itemsPerPage = 5,
        sortby,
        ascending = true,
    }: IACele.API.Request.TreeSearchRead<K>) => {

        return await this.execute(
            async () => {

                // Declaración de ordenamiento computado
                let computedSortby: keyof IACele.View.RecordInDatabase<K> | (keyof IACele.View.RecordInDatabase<K>)[]

                // Cálculo del desfase de registros
                const offset = page * itemsPerPage
                // Se usa el valor de registros por página para el límite
                const limit = itemsPerPage

                // Se convierte el valor a snake_case
                if ( typeof sortby === 'string' ) {
                    computedSortby = this.toSnake<K>(sortby as keyof IACele.View.RecordInDatabase<K>)
                } else if ( typeof sortby === 'object') {
                    computedSortby = (sortby as (keyof IACele.View.RecordInDatabase<K>)[]).map( (key) => this.toSnake<K>(key) )
                } else {
                    computedSortby = sortby as keyof IACele.View.RecordInDatabase<K>
                }

                const response = await iaCeleAxios.post<string, IACeleResponse<IACele.View.RecordInDatabase<K>>, IACele.API.Request.SearchRead<K>>(
                    getBackendUrl(API_PATH.SEARCH_READ),
                    {
                        table,
                        searchCriteria,
                        fields,
                        offset,
                        limit,
                        sortby: computedSortby,
                        ascending,
                    },
                    { authenticate: true }
                );

                return (response.data);
            }
        )
    };

    /** 
     *  ## Ejecución de acción
     *  Este método permite ejecutar una acción de servidor sobre un registro de
     *  una tabla en la base de datos.
     *  - [ {@link IACele.API.Database.TableName TableName} ] `table`: Nombre de la
     *  tabla en la base de datos.
     *  - [ `number` ] `recordIds`: ID del registro a eliminar.
     *  - [ `string` ] `action`: Nombre de la acción a ejecutar en el backend.
     */ 
    action = async ({
        table,
        recordIds,
        action,
    }: IACele.API.Request.ExecuteAction) => {

        return await this.execute(
            async () => {
                const response = await iaCeleAxios.post<string, boolean, IACele.API.Request.ExecuteAction>(
                    getBackendUrl(API_PATH.EXECUTE_ACTION),
                    {
                        table,
                        recordIds,
                        action,
                    },
                    { authenticate: true }
                );

                return response;
            }
        );
    };

    private toSnake = <T extends IACele.API.Database.TableName>(text: keyof IACele.View.RecordInDatabase<T>): keyof IACele.View.RecordInDatabase<T> => {
        return ( (text as string).replace(/([A-Z])/, '_$1').toLowerCase() ) as keyof IACele.View.RecordInDatabase<T>;
    };

    private execute = async <T>( callback: () => Promise<T> ) => {
        // Se establece el estado de carga a verdadero
        this._setAppLoading(true);
        // Obtención de los datos desde el backend
        const data = await callback();
        // Se establece el estado de carga a falso
        this._setAppLoading(false);
        // Se establece el estado de carga a falso
        return data;
    };
};

export default APIManager;
