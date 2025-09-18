import useRecordForm from "../../../hooks/views/useFormRecord";
import RecordFormContext from "../../../contexts/view/form/RecordFormContext";
import Page from "../template/Page";
import Header from "../template/Header";
import Sheet from "../template/Sheet";
import Group from "./Group";
import Action from "./Action";
import Notebook from "./Notebook";
import Controls from "./controls/Controls";
import Alert from "./alert/Alert";
import ModalProvider from "../../../providers/ModalProvider";
import MainControls from "../../common/navbar/controls/MainControls";
import Field from "./field/Field";

const Form = <M extends ModelName>({
    modelName,
    readonly,
    children,
}: IACele.View.Form.Params<M>) => {

    const {
        loaded,
        formMode,
        formRecord,
        setFormRecordField,
        fieldsMetadata,
        reload,
        newRecord,
        hasChanges,
        undoChanges,
        saveChanges,
    } = useRecordForm<M>(modelName);

    if ( loaded ) {
        return (
            <ModalProvider>
                <RecordFormContext.Provider value={{ modelName, readonly, formMode, formRecord, reload, fieldsMetadata, setFormRecordField, saveChanges }}>

                    <div className="p-2 w-full h-min min-h-full">
                        {children({ Page, Header, Sheet, Group, Field, Action, Notebook, Alert })}
                    </div>

                    <MainControls>
                        <Controls
                            formMode={formMode}
                            hasChanges={hasChanges}
                            newRecord={newRecord}
                            saveChanges={saveChanges}
                            undoChanges={undoChanges}
                        />
                    </MainControls>
                </RecordFormContext.Provider>
            </ModalProvider>
        );
    };
};

export default Form;
