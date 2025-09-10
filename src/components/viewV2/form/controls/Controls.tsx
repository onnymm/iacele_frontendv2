import NewRecordButton from "./NewRecordButton";
import SaveRecordButton from "./SaveRecordButton";
import UndoButton from "./UndoButton";

const Controls = ({
    formMode,
    hasChanges,
    newRecord,
    saveChanges,
    undoChanges,
}: IACeleV2.View.Form.Controls.Hub) => {

    return (
        <div className="flex gap-1">
            <NewRecordButton formMode={formMode} newRecord={newRecord} />
            <SaveRecordButton hasChanges={hasChanges} saveChanges={saveChanges} />
            <UndoButton formMode={formMode} hasChanges={hasChanges} undoChanges={undoChanges} />
        </div>
    );
};

export default Controls;
