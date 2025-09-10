import { Button as HeroButton } from "@heroui/react";
import React from "react";
import Sizeable from "../common/Sizeable";
import useComponentColor from "../../hooks/app/useComponentColor";

const Button: React.FC<IACeleV2.UI.Button.Params> = ({
    isIconOnly,
    startContent,
    endContent,
    className,
    children,
    color,
    onPress,
    isDisabled = false,
}) => {

    // Obtención de color para componente HeroUI
    const { adaptedColor } = useComponentColor(color);

    return (
        <Sizeable>
            {({ componentSize }) => (
                <HeroButton
                    size={componentSize}
                    variant="solid"
                    className={className}
                    isIconOnly={isIconOnly}
                    startContent={startContent}
                    endContent={endContent}
                    color={adaptedColor}
                    onPress={onPress}
                    isDisabled={isDisabled}
                >
                    {children}
                </HeroButton>
            )}
        </Sizeable>
    );
};

export default Button;
