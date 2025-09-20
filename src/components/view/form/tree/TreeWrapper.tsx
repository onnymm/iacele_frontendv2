import FormTreeContext from "../../../../contexts/view/form/FormTreeContext";
import useFieldTree from "../../../../hooks/views/form/tree/useFieldTree";
import Tree from "./Tree";
import TreeContent from "./TreeContent";
import TreeField from "./TreeField";

const TreeWrapper = <
    M extends ModelName,
    F extends IACele.Data.Models.FieldName<M>,
    R extends IACele.Data.Models.RelatedModelName<M, F>,
>({
    config,
}: IACele.View.Form.Field.Tree.Wrapper.Params<M, F, R>) => {

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
    } = useFieldTree<M, F, R>();

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
            {config({ Field: TreeField<M, F, R>, Tree })}
            {dataLoaded &&
                <TreeContent />
            }
        </FormTreeContext.Provider>
    );
};

export default TreeWrapper;
