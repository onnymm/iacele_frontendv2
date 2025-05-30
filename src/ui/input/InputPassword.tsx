import { useState } from "react";
import InputText from "./InputText"
import { LockOutlineRounded, SvgIconComponent, VisibilityOffRounded, VisibilityRounded } from "@mui/icons-material";

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
const InputPassword: React.FC<IACele.UI.Input> = ({
    value, // Valor de contraseña.
    onValueChange, // Función de cambio de estado de valor de contraseña.
}) => {

    // Inicialización de estado de visibilidad de contraseña
    const [ isVisiblePassword, setIsVisiblePassword ] = useState<boolean>(false);

    // Función de interruptor de visibilidad de contraseña
    const toggleVisibility = () => {
        setIsVisiblePassword( (prevState) => (!prevState) );
    };

    return (
        <InputText
            value={value}
            onValueChange={onValueChange}
            name="password"
            label="Contraseña"
            icon={LockOutlineRounded}
            type={isVisiblePassword ? 'text' : 'password'}
            endContent={<IconToggle onClick={toggleVisibility} icon={isVisiblePassword ? VisibilityRounded : VisibilityOffRounded} />}
        />
    );
};

export default InputPassword;

interface ToggleIcon {
    icon: SvgIconComponent // Ícono a renderizar dependiendo del estado de visibilidad.
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void // Función a ejecutar cuando se da clic en el botón.
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
const IconToggle: React.FC<ToggleIcon> = ({
    icon: Icon,
    onClick
}) => {

    return (
        <button onClick={onClick} type="button" className="top-0 right-0 absolute mr-2 h-full">
            <Icon className="min-w-6 h-6 text-gray-500 group-data-[focus-within=true]:text-primary-500 transition-colors duration-100 pointer-events-auto" />
        </button>
    );
};
