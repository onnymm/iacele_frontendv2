import API_PATH from "../../../constants/api/apiPath";
import settings from "../../../settings/app";
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
            API_PATH.FRONTEND.TREE._,
            dataRequest,
        );

        return dataResponse;
    };

    get = async <M extends ModelName>(
        modelName: M,
        page: number,
    ) => {

        // Se construyen los datos a enviar al backend
        const dataRequest: IACele.API.Request.Tree.Get<M> = {
            'model_name': modelName,
            'page': page,
            'items_per_page': settings.view.defaultItemsPerPage,
        };

        // Obtención de los datos
        const dataResponse = await this.main.post<IACele.API.Request.Tree.Get<M>, IACele.API.Response.View.Tree<M>>(
            API_PATH.FRONTEND.TREE.GET,
            dataRequest,
        );

        return dataResponse;
    };
};

export default Tree;
