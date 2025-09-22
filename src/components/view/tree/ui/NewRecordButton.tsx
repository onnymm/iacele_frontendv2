import { useCallback } from "react";
import { useNavigate } from "react-router";
import Button from "../../../ui/buttons/Button";
import { Plus } from "lucide-react";
import { BUTTONS } from "../../../../constants/app/ui";

const NewRecordButton = ({
    open,
    create,
}: IACele.View.UI.NewRecord) => {

    // Obtención de función de navegación
    const navigateTo = useNavigate();

    const onPress = useCallback(
        () => {
            if ( open ) {
                navigateTo(open)
            };
        }, [navigateTo, open]
    )

    // Si la vista no permite creación no se retorna el componente
    if ( !create || !open ) return null;

    return (
        <Button
            icon={Plus}
            onPress={onPress}
            color="primary"
            isAsync
        >
            {BUTTONS.NEW_RECORD}
        </Button>
    );
};

export default NewRecordButton;
