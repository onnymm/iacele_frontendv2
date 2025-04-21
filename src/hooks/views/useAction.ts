import { useContext } from "react";
import RecordFormContext from "../../contexts/recordFormContext";
import APIContext from "../../contexts/apiContext";
import useAsyncDisabled from "../app/useAsyncDisabled";
import useActionModal from "./useConfirmModal";
import Action from "../../components/views/form/Action"; // eslint-disable-line

/** 
 *  ## Acción de formulario
 *  Este Custom Hook crea los estados y funciones a ejecutar por el componente
 *  {@link Action}.
 *  
 *  ### Parámetros de entrada
 *  - [ `string` ] `actionToExecute`: Acción de servidor a ejecutar por el
 *  componente.
 *  - [ `function` ] `invisible`: Función que valida el valor de uno o más
 *  atributos del registro para validar si el componente debe mostrarse o no.
 *  - [ {@link IACele.UI.DecorationColor DecorationColor} ] `color`: Color del
 *  botón de `"Aceptar"` en modal de confirmación.
 *  - [ `string | undefined` ] `confirmMessage`: Mensaje a mostrar en modal
 *  para confirmar si realmente se desea ejecutar la acción.
 *  - [ `string | undefined` ] `doneMessage`: Mensaje a mostrar en modal
 *  cuando la acción se ejecutó correctamente.
 */ 
const useAction = <K extends IACele.API.Database.TableName>(
    actionToExecute: string,
    invisible: (record: IACele.View.RecordInDatabase<K>) => boolean,
    color: IACele.UI.DecorationColor,
    confirmMessage: string | undefined,
    notifyMessage: string | undefined,
) => {

    // Obtención de tabla, registro y estado de carga
    const { table, record, reload } = useContext(RecordFormContext) as IACele.Context.FormField<K>;
    // Obtención de instancia de API
    const { api } = useContext(APIContext);
    // Inicialización de estado deshabilitado
    const [ isDisabled ] = useAsyncDisabled(false);

    // Creación de función para ejecutar la acción de servidor
    const executeCallback = async () => {
        // Ejecución de la acción en el backend
        const response = await api.action({ table, recordIds: record.id, action: actionToExecute });
        // Si la acción se ejecutó correctamente se realiza una recarga de los datos del formulario
        if ( response ) reload();
    };

    // Función envuelta para abrir modal de confirmación si es necesario
    const { executeWithConfirmation } = useActionModal(executeCallback, confirmMessage, notifyMessage, color);

    // Valor de visibilidad computado
    const isInvisible = invisible(record);

    return { isDisabled, executeWithConfirmation, isInvisible };
};

export default useAction;
