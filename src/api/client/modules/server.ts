import API_PATH from "../../../constants/api/apiPath";
import Client from "../client";

class Server {

    private main: Client;

    constructor (
        main: Client,
    ) {

        // Se asigna la referencia de la instancia principal
        this.main = main;
    };

    action = async <M extends ModelName>(
        actionName: string,
        modelName: M,
        recordId: number,
    ) => {

        // Creación de los datos a enviar al endpoint
        const dataRequest: IACeleV2.API.Request.Server.Action<M> = {
            'model_name': modelName,
            'record_id': recordId,
            'action': actionName,
        };

        // Ejecución de la acción
        await this.main.post<IACeleV2.API.Request.Server.Action<M>, true>(
            API_PATH.EXECUTE_ACTION,
            dataRequest,
        );
    };
};

export default Server;
