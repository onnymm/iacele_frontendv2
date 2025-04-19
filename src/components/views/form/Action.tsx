import { Button } from "@heroui/react";
import Sizeable from "../../common/Sizeable";
import useAction from "../../../hooks/views/useAction";

/** 
 *  ## Acción de formulario
 *  Este componente renderiza un botón que ejecuta una acción de servidor sobre
 *  el registro que se muestra en el formulario.
 *  
 *  ### Parámetros de entrada
 *  - [ `string` ] `name`: Nombre de la acción que se renderizará como leyenda
 *  del botón.
 *  - [ `string` ] `execute`: Nombre de la acción a ejecutar en el backend.
 *  - [ `function` ] `invisible`: Función que valida el valor de uno o más
 *  atributos del registro para validar si el componente debe mostrarse o no.
 *  - [ {@link IACele.UI.DecorationColor DecorationColor} ] `color`: Color del
 *  botón de acción.
 *  - [ `string | undefined` ] `confirm`: Mensaje a mostrar en modal para
 *  confirmar o cancelar la acción.
 *  - [ `string | undefined` ] `notify`: Mensaje a mostrar en modal para
 *  notificar que la acción fue ejecutada correctamente.
 */ 
const Action = <K extends IACele.API.Database.TableName>({
    name,
    execute,
    invisible = () => false,
    color = 'default',
    confirm,
    notify,
}: IACele.View.Form.Action<K>) => {

    // Obtención de estados y funciones
    const { isDisabled, executeWithConfirmation, isInvisible } = useAction<K>(execute, invisible, color, confirm, notify);

    // Si la validación de invisible no es verdadera se renderiza el componente
    if ( !isInvisible )
    return (
        <Sizeable>
            {({ componentSize }) => (
                <Button isDisabled={isDisabled} onPress={executeWithConfirmation} size={componentSize} variant="solid" color={color}>
                    {name}
                </Button>
            )}
        </Sizeable>
    );
};

export default Action;
