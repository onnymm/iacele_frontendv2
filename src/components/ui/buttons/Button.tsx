import React from "react";
import useAsyncDisabled from "../../../hooks/app/useAsyncDisabled";
import Sizeable from "../../common/Sizeable";
import { Button as HeroUIButton } from "@heroui/react";
import useComponentColor from "../../../hooks/app/useComponentColor";

const Button: React.FC<IACele.UI.Button.Params> = ({
    children,
    icon: Icon,
    onPress,
    isAsync = false,
    isDisabled = false,
    color,
}) => {

    // Creación de deshabilitado asíncrono
    const [ isAsyncDisabled ] = useAsyncDisabled(false);
    // Obtención de color para uso en componente de HeroUI
    const { adaptedColor } = useComponentColor(color)
    // Cómputo de estado de deshabilitado
    const computedIsDisabled = ( isAsync && isAsyncDisabled ) || isDisabled;

    return (
        <Sizeable>
            {({ componentSize }) => (
                <HeroUIButton
                    onPress={onPress}
                    isDisabled={computedIsDisabled}
                    size={componentSize}
                    variant="solid"
                    color={adaptedColor}
                    endContent={<Icon className="outline-none size-5 pointer-events-none" />}
                    isIconOnly={children === undefined}
                >
                    {children}
                </HeroUIButton>
            )}
        </Sizeable>
    );
};

export default Button;
