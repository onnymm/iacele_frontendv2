import { useState } from "react";
import IconLock from "../../components/icons/IconLock"
import InputText from "./InputText"
import IconEye from "../../components/icons/IconEye";
import IconEyeClosed from "../../components/icons/IcoonEyeClosed";

const InputPassword: React.FC<IACele.UI.Input> = ({
    value,
    onValueChange,
}) => {

    const [ isVisiblePassword, setIsVisiblePassword ] = useState<boolean>(false);

    const toggleVisibility = () => {
        console.log('toggle');
        setIsVisiblePassword( (prevState) => (!prevState) )
    }

    return (
        <InputText
            value={value}
            onValueChange={onValueChange}
            name="password"
            label="Contraseña"
            icon={IconLock}
            type={isVisiblePassword ? 'text' : 'password'}
            endContent={<IconToggle onClick={toggleVisibility} icon={isVisiblePassword ? IconEyeClosed : IconEye} />}
        />
    );
};

export default InputPassword;

interface ToggleIcon {
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const IconToggle: React.FC<ToggleIcon> = ({
    icon: Icon,
    onClick
}) => {

    return (
        <button onClick={onClick} type="button" className="top-0 right-0 absolute mr-2 h-full">
            <Icon className="fill-gray-500 group-data-[focus-within=true]:fill-primary-500 min-w-6 h-6 transition-colors duration-100 pointer-events-auto" />
        </button>
    )
}
