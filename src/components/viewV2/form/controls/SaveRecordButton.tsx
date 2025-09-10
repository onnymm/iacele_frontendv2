import { Button } from "@heroui/react";
import useAsyncDisabled from "../../../../hooks/app/useAsyncDisabled";
import Sizeable from "../../../common/Sizeable";
import { Save } from "lucide-react";

const SaveRecordButton: React.FC<IACeleV2.View.Form.Controls.SaveRecord> = ({
    saveChanges,
    hasChanges,
}) => {

    // Creación de deshabilitado asíncrono
    const [ isDisabled ] = useAsyncDisabled(false);

    // Si el registro del formulario no tiene cambios...
    if ( !hasChanges ) return;

    return (
        <Sizeable>
            {({ componentSize }) => (
                <Button
                    size={componentSize}
                    isIconOnly
                    isDisabled={isDisabled}
                    color="success"
                    onPress={saveChanges}
                >
                    <Save className="outline-none size-4 text-white" />
                </Button>
            )}
        </Sizeable>
    );
};

export default SaveRecordButton;
