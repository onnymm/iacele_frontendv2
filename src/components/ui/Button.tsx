import { Button as HeroButton } from "@heroui/react";
import React from "react";
import Sizeable from "../common/Sizeable";

type _ButtonParams = IACele.UI.GenericInvolverComponent & IACele.UI._SupportsClassName;
interface ButtonParams extends _ButtonParams {
    isIconOnly?: boolean;
    startContent?: React.ReactNode;
    endContent?: React.ReactNode;
};

const Button: React.FC<ButtonParams> = ({
    isIconOnly,
    startContent,
    endContent,
    className,
    children,
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
                >
                    {children}
                </HeroButton>
            )}
        </Sizeable>
    );
};

export default Button;
