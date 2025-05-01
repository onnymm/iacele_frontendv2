import { Button } from "@heroui/react"
import { AddRounded } from "@mui/icons-material"
import useAsyncDisabled from "../../../hooks/app/useAsyncDisabled";

/** No implementado */
const ButtonNew = () => {

    // Creación de deshabilitado asíncrono
    const [ isDisabled ] = useAsyncDisabled(false);

    return (
        <div>
            <div className="sm:hidden">
                <Button
                    isDisabled={isDisabled}
                    variant="solid"
                    color="primary"
                    endContent={<Icon />}
                    isIconOnly
                />
            </div>
            <div className="hidden sm:block">
                <Button
                    isDisabled={isDisabled}
                    size="sm"
                    variant="solid"
                    color="primary"
                    endContent={<Icon />}
                >
                    Nuevo
                </Button>
            </div>
        </div>
    );
};

export default ButtonNew;

const Icon = () => {

    return (
        <AddRounded className="outline-none" />
    );
};
