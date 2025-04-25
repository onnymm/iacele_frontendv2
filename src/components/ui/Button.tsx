import { Button as HeroButton } from "@heroui/react";
import React from "react";
import Sizeable from "../common/Sizeable";

type _ButtonParams = IACele.UI.GenericInvolverComponent & IACele.UI._SupportsClassName & IACele.UI._Colorizable;
interface ButtonParams extends _ButtonParams {
    isIconOnly?: boolean;
    startContent?: React.ReactNode;
    endContent?: React.ReactNode;
    onPress: () => void;
};

const Button: React.FC<ButtonParams> = ({
    isIconOnly,
    startContent,
    endContent,
    className,
    children,
    color,
    onPress,
}) => {

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
                    color={color}
                    onPress={onPress}
                >
                    {children}
                </HeroButton>
            )}
        </Sizeable>
    );
};

export default Button;
