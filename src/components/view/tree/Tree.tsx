import useTree from "../../../hooks/views/tree/useTree";
import MainControls from "../../common/navbar/controls/MainControls";
import Pagination from "./Pagination";
import DynamicControls from "../../common/navbar/controls/DynamicControls";
import NewRecordButton from "./ui/NewRecordButton";
import Fields from "./Fields";
import TreeContext from "../../../contexts/view/tree/TreeContext";
import Field from "./field/Field";
import TreeContent from "./TreeContext";

const Tree = <M extends ModelName>({
    modelName,
    children,
    open,
    create = true,
}: IACele.View.List.Tree.Component<M>) => {

    const {
        config,
        addConfig,
        dataLoaded,
        dataFromAPI,
        metadataFromAPI,
        totalRecords,
        page,
        setPage,
    } = useTree<M>(modelName);

    return (
        <TreeContext.Provider value={{ open, modelName, addConfig: (addConfig as (config: IACele.View.List.Tree.Config<any>) => (void)), config, dataFromAPI, metadataFromAPI, totalRecords, dataLoaded, modelLabel: '', create }}>

            {/* Construcción de la vista a renderizar */}
            {children({ Field, Fields })}

            {/* Renderización de vista */}
            <TreeContent />

            {/* Se establecen los controles principales */}
            <MainControls>
                <NewRecordButton open={open} create={create} />
            </MainControls>

            {/* Se establecen los controles dinámicos */}
            <DynamicControls>
                <Pagination page={page} setPage={setPage} totalRecords={totalRecords} />
            </DynamicControls>

        </TreeContext.Provider>
    );
};

export default Tree;
