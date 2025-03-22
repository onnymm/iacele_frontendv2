import { Switch } from "@heroui/react"
import { useContext } from "react"
import DarkModeContext from "../../contexts/darkModeContext"
import IconMoon from "../icons/IconMoon";
import IconSun from "../icons/IconSun";

/** 
 *  ## Switch de modo oscuro
 *  Este componente renderiza un swtich que activa o desactiva el modo oscuro
 *  de la aplicación
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  Este componente no requiere parámetros de entrada.
 */ 
const DarkModeSwitch = (): (React.JSX.Element) => {

    // Obtención de valores del contexto
    const {darkMode, setDarkMode} = useContext<IACele.Context.DarkMode>(DarkModeContext);

    return (
        <Switch classNames={{wrapper: 'shadow-[inset_0px_1px_2px_0px_rgba(0,_0,_0,_0.3)]'}} size="sm" isSelected={darkMode} onValueChange={setDarkMode} thumbIcon={<ThumbIcon isSelected={darkMode} />} />
    );
};

export default DarkModeSwitch;

const ThumbIcon: React.FC<{isSelected: boolean}> = ({
    isSelected,
}) => {

    // Ícono a renderizar
    const IconToRender = (
        isSelected
            ? IconMoon
            : IconSun
    );

    return (
        <IconToRender className="fill-gray-500" />
    );
};
