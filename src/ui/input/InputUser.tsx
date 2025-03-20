import IconUser from "../../components/icons/IconUser";
import InputText from "./InputText"

const InputUser: React.FC<IACele.UI.Input> = ({
    value,
    onValueChange,
}) => {

    return (
        <InputText
            value={value}
            onValueChange={onValueChange}
            name="username"
            icon={IconUser}
            label="Usuario"
        />
    );
};

export default InputUser;
