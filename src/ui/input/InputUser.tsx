import { PersonRounded } from "@mui/icons-material";
import InputText from "./InputText"

/** 
 *  ## Campo de usuario
 *  Este componente renderiza un campo construido para utilizarse como campo de
 *  usuario.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ `string` ] `value`: Valor de usuario.
 *  - [ {@link React.Dispatch<React.SetStateAction<string>>} ] `onValueChange`:
 *  Función de cambio de estado de valor de usuario.
 */ 
const InputUser: React.FC<IACele.UI.Input> = ({
    value,
    onValueChange,
}) => {

    return (
        <InputText
            value={value}
            onValueChange={onValueChange}
            name="username"
            icon={PersonRounded}
            label="Usuario"
        />
    );
};

export default InputUser;
