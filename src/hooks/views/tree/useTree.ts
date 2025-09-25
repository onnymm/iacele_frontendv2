import { useCallback, useContext, useEffect, useState } from "react"
import APIContext from "../../../contexts/apiContext"
import useTreeConfig from "../useTreeConfig";
import useAddConfig from "../useAddConfig";
import useViewName from "../../app/usePageName";

const useTree = <M extends ModelName>(
    modelName: M,
): IACele.Hook.List.Tree.Main<M> => {

    // Obtención de instancia de conexión con API
    const { api } = useContext(APIContext);
    // Obtención de función para cambio de nombre de vista
    const { setViewName } = useViewName();

    // Creación de datos para obtención y manipulación de datos
    const {
        dataFromAPI,
        setDataFromAPI,
        metadataFromAPI,
        setMetadataFromAPI,
        dataLoaded,
        setDataLoaded,
        totalRecords,
        setTotalRecords,
    } = useAPIData<M>();

    // Inicialización de configuración del árbol
    const { config } = useTreeConfig<M>();
    // Inicialización de función para añadir datos de vista
    const { addConfig } = useAddConfig<M>(config);

    // Inicialización de estado de página
    const [ page, setPage ] = useState<number>(0);

    // Inicialización de función de obtención de datos
    const getRecords = useCallback(
        async () => {
            // Si el estado de carga es verdadero se termina la ejecución
            if ( dataLoaded ) return;

            // Obtención de la API
            const { records, fields, count, model_label } = await api.tree.get<M>(modelName, page);
            // Se establecen los estados con los datos
            setDataFromAPI(records);
            setMetadataFromAPI(fields);
            setTotalRecords(count);
            setViewName(model_label);
            // Se establece el estado de carga a verdadero
            setDataLoaded(true);
        }, [api.tree, dataLoaded, modelName, page, setDataFromAPI, setDataLoaded, setMetadataFromAPI, setTotalRecords, setViewName]
    );

    // Carga de datos
    useEffect(
        () => {
            getRecords();
        }, [getRecords]
    );

    // Se dispara la ejecución cuando los parámetros cambian
    useEffect(
        () => {
            setDataLoaded(false);
        }, [page, setDataLoaded]
    );

    return { config, addConfig, dataLoaded, setDataLoaded, dataFromAPI, metadataFromAPI, totalRecords, page, setPage };
};

export default useTree;

const useAPIData = <M extends ModelName>(): IACele.Hook.View.Form.TreeAPIData<M> => {

    // Inicialización de datos desde la API
    const [ dataFromAPI, setDataFromAPI ] = useState<IACele.Data.Models.Record<M>[]>([]);
    const [ metadataFromAPI, setMetadataFromAPI ] = useState<IACele.Data.Models.Field<M>[]>([]);
    const [ totalRecords, setTotalRecords ] = useState<number>(0);

    // Inicialización de estado de cargar
    const [ dataLoaded, setDataLoaded ] = useState<boolean>(false);

    return { dataFromAPI, setDataFromAPI, metadataFromAPI, setMetadataFromAPI, dataLoaded, setDataLoaded, totalRecords, setTotalRecords };
};
