import { Button } from "@heroui/react";
import Sizeable from "../../../common/Sizeable";
import { RotateCcw } from "lucide-react";

const UndoButton: React.FC<IACele.View.Form.Controls.UndoChanges> = ({
    formMode,
    hasChanges,
    undoChanges,
}) => {

    // Si el formulario está en modo lectura y no hay cambios, se termina la ejecución
    if ( formMode === 'read' && !hasChanges ) return;

    return (
        <Sizeable>
            {({ componentSize }) => (
                <Button
                    onPress={undoChanges}
                    size={componentSize}
                    variant="solid"
                    isIconOnly
                >
                    <RotateCcw  className="outline-none size-4" />
                </Button>
            )}
        </Sizeable>
    );
};

export default UndoButton;
