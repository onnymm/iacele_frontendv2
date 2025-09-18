import API_PATH from "../../../constants/api/apiPath";
import Client from "../client";

class Tree {

    private main: Client;

    constructor (
        main: Client,
    ) {
        // Se asigna la referencia de la instancia principal
        this.main = main;
    };

    read = async <M extends ModelName>(
        modelName: M,
        recordIds: number[],
    ) => {

        // Creación de los datos a enviar al endpoint
        const dataRequest: IACele.API.Request.Crud.Read<M> = {
            'model_name': modelName,
            'record_ids': recordIds,
            
        };

        // Obtención de los datos de los registros
        const dataResponse = await this.main.post<IACele.API.Request.Crud.Read<M>, IACele.View.Tree.Data<M>>(
            API_PATH.TREE,
            dataRequest,
        );

        return dataResponse;
    };
};

export default Tree;
