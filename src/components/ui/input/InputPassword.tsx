import { useCallback, useMemo, useState } from "react";
import InputText from "./InputText"
import { Eye, EyeOff, LockKeyhole } from "lucide-react";

/** 
 *  ## Campo de contraseña
 *  Este componente renderiza un campo construido para utilizarse como campo de
 *  contraseña.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ `string` ] `value`: Valor de contraseña.
 *  - [ {@link React.Dispatch<React.SetStateAction<string>>} | `undefined` ]
 *  `onValueChange`: Función de cambio de estado de valor de contraseña.
 */ 
const InputPassword: React.FC<IACele.UI.Input.Password.Params> = ({
    value,
    onValueChange,
}) => {

    // Inicialización de los valores para su uso en el componente
    const { isVisiblePassword, togglePasswordVisibility, InputType } = usePasswordInput();

    return (
        <InputText
            value={value}
            onValueChange={onValueChange}
            name="password"
            label="Contraseña"
            icon={LockKeyhole}
            type={InputType}
            endContent={
                <IconToggle
                    onClick={togglePasswordVisibility}
                    icon={
                        isVisiblePassword
                            ? Eye
                            : EyeOff
                    }
                />
            }
        />
    );
};

export default InputPassword;

const usePasswordInput = () => {

    // Inicialización de estado de visibilidad de contraseña
    const [ isVisiblePassword, setIsVisiblePassword ] = useState<boolean>(false);

    // Inicialización de función de cambio de visibilidad de contraseña
    const togglePasswordVisibility = useCallback(
        () => {
            setIsVisiblePassword( (value) => (!value) );
        }, []
    );

    // Estado de tipo de dato de campo, en función de si la contraseña es visible o no
    const InputType = useMemo<React.InputHTMLAttributes<HTMLInputElement>['type']>(
        () => (
            isVisiblePassword
                ? 'text'
                : 'password'
        ), [isVisiblePassword]
    );

    return { isVisiblePassword, togglePasswordVisibility, InputType };
};

/** 
 *  ## Switch visibilidad de contraseña
 *  Este componente renderiza un ícono que cambia el tipo de campo de contraseña
 *   a texto y viceversa para poder controlar la visibilidad de la contraseña
 *  ingresada por el usuario.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ {@link React.FC<React.SVGProps<SVGSVGElement>>} ] `icon`: Ícono a
 *  renderizar dependiendo del estado de visibilidad.
 *  - [ `undefined` ] `onClick`: Función a ejecutar cuando se da clic en el botón
 *  .
 */ 
const IconToggle: React.FC<IACele.UI.Input.Password.Toggle.Params> = ({
    icon: Icon,
    onClick
}) => {

    return (
        <button onClick={onClick} type="button" className="top-0 right-0 absolute mr-2 h-full">
            <Icon className="min-w-6 h-6 text-gray-500 group-data-[focus-within=true]:text-primary-500 transition-colors duration-100 pointer-events-auto" />
        </button>
    );
};
