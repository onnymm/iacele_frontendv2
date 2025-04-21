import { Button } from "@heroui/react"
import { AddRounded } from "@mui/icons-material"

/** No implementado */
const ButtonNew = () => {

    return (
        <div>
            <div className="sm:hidden">
                <Button
                    variant="solid"
                    color="primary"
                    endContent={<Icon />}
                    isIconOnly
                />
            </div>
            <div className="hidden sm:block">
                <Button
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
