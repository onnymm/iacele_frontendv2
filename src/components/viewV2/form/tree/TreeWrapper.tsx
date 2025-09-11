import FormTreeContext from "../../../../contexts/view/form/FormTreeContext";
import useTree from "../../../../hooks/views/form/tree/useTree";
import Tree from "./Tree";
import TreeContent from "./TreeContent";
import TreeField from "./TreeField";

const TreeWrapper = <
    M extends ModelName,
    F extends IACeleV2.Data.Models.FieldName<M>,
    R extends IACeleV2.Data.Models.RelatedModelName<M, F>,
>({
    config,
}: IACeleV2.View.Form.Field.Tree.Wrapper.Params<M, F, R>) => {

    // Obtención de estados y funciones
    const {
        name,
        relatedModelName,
        treeConfig,
        addConfig,
        dataLoaded,
        setDataLoaded,
        dataFromAPI,
        metadataFromAPI,
    } = useTree<M, F, R>();

    return (
        <FormTreeContext.Provider
            value={{
                name,
                modelName: relatedModelName,
                treeConfig,
                addConfig,
                setDataLoaded,
                records: dataFromAPI,
                fields: metadataFromAPI,
            }}
        >
            {config({ Field: TreeField<R>, Tree })}
            {dataLoaded &&
                <TreeContent />
            }
        </FormTreeContext.Provider>
    );
};

export default TreeWrapper;
