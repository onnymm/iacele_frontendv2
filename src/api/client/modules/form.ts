import API_PATH from "../../../constants/api/apiPath";
import Client from "../client";

class Form {

    private main: Client;

    constructor (
        main: Client,
    ) {
        // Se asigna la referencia de la instancia principal
        this.main = main;
    };

    create = async <M extends ModelName>(
        modelName: M,
        record: Partial<IACeleV2.Data.Models.Record<M>>,
    ): Promise<number> => {

        // Creación de los datos a enviar al endpoint
        const data: IACeleV2.API.Request.Form.Create<M> = {
            'model_name': modelName,
            'data': record,
        };

        // Creación del registro y obtención de su ID
        const [ createdId ] = await this.main.post<IACeleV2.API.Request.Form.Create<M>, number[]>(
            API_PATH.CREATE,
            data,
        );

        return createdId;
    };

    read = async <M extends ModelName>(
        modelName: M,
        recordId: number,
    ): Promise<IACeleV2.View.Form.Data<M>> => {

        // Creación de los datos a enviar al endpoint
        const dataRequest: IACeleV2.API.Request.Form.Read<M> = {
            'model_name': modelName,
            'record_id': recordId,
        };

        // Lectura del registro
        const dataResponse = await this.main.post<IACeleV2.API.Request.Form.Read<M>, IACeleV2.View.Form.Data<M>>(
            API_PATH.FORM,
            dataRequest,
        );

        return dataResponse;
    };

    update = async <M extends ModelName>(
        modelName: M,
        recordId: number,
        dataToWrite: Partial<IACeleV2.Data.Models.Record<M>>,
    ) => {

        // Creación de los datos a enviar al endpoint
        const dataRequest: IACeleV2.API.Request.Form.Update<M> = {
            'model_name': modelName,
            'record_ids': recordId,
            'data': dataToWrite,
        };

        // Actualización del registro
        await this.main.patch<IACeleV2.API.Request.Form.Update<M>, boolean>(
            API_PATH.UPDATE,
            dataRequest,
        );
    };

    delete = async <M extends ModelName>(
        modelName: M,
        recordId: number,
    ) => {
        
        // Creación de los datos a enviar al endpoint
        const dataRequest: IACeleV2.API.Request.Form.Delete<M> = {
            'model_name': modelName,
            'record_ids': recordId,
        };

        // Eliminación del registro
        await this.main.delete<IACeleV2.API.Request.Form.Delete<M>>(
            API_PATH.DELETE,
            dataRequest,
        );
    };

    getFieldRelatedRecords = async <M extends ModelName>(
        modelName: M,
        domain: IACeleV2.Data.Models.CriteriaStructure<M>,
        searchInput: string,
    ) => {

        if ( searchInput !== '' ) {
            domain = ['&', ...domain, ['name', 'ilike', searchInput]];
        };

        const dataRequest: IACeleV2.API.Request.Form.SearchRead<M> = {
            'model_name': modelName,
            'search_criteria': domain,
            'fields': ['id', 'name'],
            'limit': 20,
        };

        const dataResponse = await this.main.post<IACeleV2.API.Request.Form.SearchRead<M>, {id: number, name: string}[]>(
            API_PATH.SEARCH_READ,
            dataRequest,
        );

        return dataResponse;
    };
};

export default Form;
