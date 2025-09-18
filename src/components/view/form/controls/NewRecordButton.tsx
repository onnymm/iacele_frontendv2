import { Button } from "@heroui/react";
import useAsyncDisabled from "../../../../hooks/app/useAsyncDisabled";
import Sizeable from "../../../common/Sizeable";
import { Plus } from "lucide-react";
import { BUTTONS } from "../../../../constants/app/ui";

const NewRecordButton: React.FC<IACele.View.Form.Controls.NewRecord> = ({
    formMode,
    newRecord,
}) => {

    // Creación de deshabilitado asíncrono
    const [ isDisabled ] = useAsyncDisabled(false);

    // Si el formulario está en modo de creación se termina la ejecución
    if ( formMode === 'create' ) return;

    return (
        <Sizeable>
            {({ componentSize }) => (
                <Button
                    onPress={newRecord}
                    isDisabled={isDisabled}
                    size={componentSize}
                    variant="solid"
                    color="primary"
                    endContent={<Plus className="outline-none size-5 pointer-events-none" />}
                >
                    {BUTTONS.NEW_RECORD}
                </Button>
            )}
        </Sizeable>
    );
};

export default NewRecordButton;
