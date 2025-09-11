import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import useFieldContext from "../../../../components/viewV2/form/useFieldContext";
import useFormRecordContext from "../../../../components/viewV2/hooks/useFormRecordContext";
import useRelatedModelName from "../../../../components/viewV2/hooks/useRelatedModelName";
import APIContext from "../../../../contexts/apiContext";

const useTree = <
    M extends ModelName,
    F extends IACeleV2.Data.Models.FieldName<M>,
    R extends IACeleV2.Data.Models.RelatedModelName<M, F>,
>(): IACeleV2.Hook.View.Form.Tree<M, F, R> => {

    // Obtención del nombre del modelo relacionado
    const { relatedModelName } = useRelatedModelName<M, R>();
    // Obtención de los datos del formulario
    const { formRecord } = useFormRecordContext<M>();
    // Obtención del nombre del campo
    const { name } = useFieldContext<M>();
    // Obtención de instancia de conexión con API
    const { api } = useContext(APIContext);

    // Inicialización de datos desde la API
    const [ dataFromAPI, setDataFromAPI ] = useState<IACeleV2.Data.Models.Record<R>[]>([]);
    const [ metadataFromAPI, setMetadataFromAPI ] = useState<IACeleV2.Data.Models.Field<R>[]>([]);
    // Inicialización de estado de cargar
    const [ dataLoaded, setDataLoaded ] = useState<boolean>(false);

    // Obtención de las IDs de registros referenciados
    const recordIds = useMemo(
        () => (
            (formRecord[name] as IACeleV2.Data.Models.TType.One2Many<M>)
            .map(
                // Se extrae la ID de cada registro
                ({ id }) => (id)
            )
        ), [formRecord, name]
    );

    // Inicialización de configuración del árbol
    const treeConfig = useMemo<IACeleV2.View.Form.Field.Tree.Config<M, F, R>[]>(
        () => ([]), []
    );

    // Inicialización de función para añadir datos de vista
    const addConfig = useCallback(
        (config: IACeleV2.View.Form.Field.Tree.Config<M, F, R>) => {
            // Si no se ha añadido la configuración de la vista...
            if ( !treeConfig.find( (item) => (item.name === config.name) ) ) {
                // Se añade ésta
                treeConfig.push(config);
            };
        }, [treeConfig]
    );

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
        }, [api, relatedModelName, recordIds, dataLoaded]
    );

    // Carga de datos
    useEffect(
        () => {
            getRecords();
        }, [getRecords]
    );

    return { name, relatedModelName, treeConfig, addConfig, dataLoaded, setDataLoaded, dataFromAPI, metadataFromAPI };
};

export default useTree;
