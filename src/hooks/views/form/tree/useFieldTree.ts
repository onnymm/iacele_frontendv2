import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import useFormRecordContext from "../useFormRecordContext";
import APIContext from "../../../../contexts/apiContext";
import useFieldContext from "../field/useFieldContext";
import useRelatedModelName from "../field/useRelatedModelName";
import useTreeConfig from "../../useTreeConfig";
import useAddConfig from "../../useAddConfig";

const useFieldTree = <
    M extends ModelName,
    F extends IACele.Data.Models.FieldName<M>,
    R extends IACele.Data.Models.RelatedModelName<M, F>,
>(): IACele.Hook.View.Form.Tree<M, F, R> => {

    // Obtención del nombre del modelo relacionado
    const { relatedModelName } = useRelatedModelName<M, R>();
    // Obtención de los datos del formulario
    const { formRecord } = useFormRecordContext<M>();
    // Obtención del nombre del campo
    const { name } = useFieldContext<M>();
    // Obtención de instancia de conexión con API
    const { api } = useContext(APIContext);

    // Creación de datos para obtención y manipulación de datos
    const { dataFromAPI, setDataFromAPI, metadataFromAPI, setMetadataFromAPI, dataLoaded, setDataLoaded } = useAPIData<R>();
    // Obtención de las IDs de registros referenciados
    const { recordIds } = useRecordIds<M>(formRecord, name);
    // Inicialización de configuración del árbol
    const { treeConfig } = useTreeConfig<R>();
    // Inicialización de función para añadir datos de vista
    const { addConfig } = useAddConfig<R>(treeConfig);

    // Inicialización de función de obtención de datos
    const getRecords = useCallback(
        async () => {
            // Si el estado de carga es verdadero se termina la ejecución
            if ( dataLoaded ) return;

            // Obtención de los datos desde la API
            const { fields, records } = await api.tree.read<R>(relatedModelName, recordIds);
            // Se establecen los estados con los datos
            setDataFromAPI(records);
            setMetadataFromAPI(fields);
            // Se establece el estado de carga a verdadero
            setDataLoaded(true);
        }, [api.tree, dataLoaded, recordIds, relatedModelName, setDataFromAPI, setDataLoaded, setMetadataFromAPI]
    );

    // Carga de datos
    useEffect(
        () => {
            getRecords();
        }, [getRecords]
    );

    return { name, relatedModelName, treeConfig, addConfig, dataLoaded, setDataLoaded, dataFromAPI, metadataFromAPI };
};

export default useFieldTree;

const useAPIData = <M extends ModelName>(): IACele.Hook.View.Form.FieldTreeAPIData<M> => {

    // Inicialización de datos desde la API
    const [ dataFromAPI, setDataFromAPI ] = useState<IACele.Data.Models.Record<M>[]>([]);
    const [ metadataFromAPI, setMetadataFromAPI ] = useState<IACele.Data.Models.Field<M>[]>([]);
    // Inicialización de estado de cargar
    const [ dataLoaded, setDataLoaded ] = useState<boolean>(false);

    return { dataFromAPI, setDataFromAPI, metadataFromAPI, setMetadataFromAPI, dataLoaded, setDataLoaded };
};

const useRecordIds = <M extends ModelName>(
    formRecord: Partial<IACele.Data.Models.Record<M>>,
    name: IACele.Data.Models.FieldName<M>,
): IACele.Hook.View.Form.TreeRecordIDs => {

    // Obtención de las IDs de registros referenciados
    const recordIds = useMemo(
        () => (
            (formRecord[name] as IACele.Data.Models.TType.One2Many<M>)
            .map(
                // Se extrae la ID de cada registro
                ({ id }) => (id)
            )
        ), [formRecord, name]
    );

    return { recordIds };
};
