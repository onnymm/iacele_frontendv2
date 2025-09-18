import { useCallback, useContext } from "react";
import useRecordId from "../../../../hooks/views/query/useRecordId";
import useFormRecordContext from "../../../../hooks/views/form/useFormRecordContext"
import APIContext from "../../../../contexts/apiContext";
import FormModalContext from "../../../../contexts/formModalContext";
import useAsyncDisabled from "../../../../hooks/app/useAsyncDisabled";
import Sizeable from "../../../common/Sizeable";
import { Button } from "@heroui/react";
import useExecuteFormValidation from "../../../../hooks/views/form/useExecuteFormValidation";

const Action = <K extends ModelName>({
    name,
    label,
    color = 'default',
    invisible,
    confirm,
    notify,
}: IACele.View.Form.Action.Params<K>) => {

    // Obtención de color computado
    const { computedColor } = useParseColor(color);
    // Creación de la función que se ejecuta en el botón
    const { executeAction } = useExecuteAction(name, color, confirm, notify);
    // Cómputo del valor de invisibilidad
    const { computedIsInvisible } = useIsActionInvisible(invisible);
    // Inicialización de estado deshabilitado
    const [ isDisabled ] = useAsyncDisabled(false);

    // Si el componente es invisible se termina la ejecución
    if ( computedIsInvisible ) return;

    return (
        <Sizeable>
            {({ componentSize }) => (
                <Button className="z-10" isDisabled={isDisabled} onPress={executeAction} size={componentSize} variant="solid" color={computedColor}>
                    {label}
                </Button>
            )}
        </Sizeable>
    );
};

export default Action;

const useParseColor = (
    color: IACele.UI.UIColor,
) => {

    // Mapa de colores
    const map: Record<IACele.UI.UIColor, IACele.UI.HeroUIColor> = {
        'primary': 'default',
        'default': 'default',
        'info': 'secondary',
        'success': 'success',
        'warning': 'warning',
        'danger': 'danger',
    };

    // Cómputo del color
    const computedColor = map[color];

    return { computedColor };
};

const useIsActionInvisible = <M extends ModelName>(
    invisible: IACele.View.UsingRecord<M, boolean> | undefined,
) => {

    // Obtención de la función de validación
    const { executeFormValidation } = useExecuteFormValidation<M>();
    // Cálculo del valor de invisibilidad
    const computedIsInvisible = executeFormValidation(invisible);

    return { computedIsInvisible };
};

const useExecuteAction = <K extends ModelName>(
    name: string,
    color: IACele.UI.UIColor,
    confirm: string | undefined,
    notify: string | undefined,
) => {

    // Inicialización de la función de ejecución en servidor
    const { executeActionInServer } = useBuildActionExecution<K>(name);
    // Inicialización de función que notifica
    const { executeAndNotify } = useActionNotify(executeActionInServer, notify);
    // Inicialización de función que confirma antes de ser ejecutada
    const { executeWithConfirmation } = useActionConfirmation(executeAndNotify, confirm, color);

    return { executeAction: executeWithConfirmation };
};

const useBuildActionExecution = <K extends ModelName>(
    name: string,
) => {

    // Obtención de la instancia de API
    const { api } = useContext(APIContext);
    // Obtención del nombre del modelo y los datos del registro
    const { modelName, reload, saveChanges } = useFormRecordContext<K>();
    // Obtención de la ID del registro
    const { recordId } = useRecordId();

    // Inicialización de la función de acción
    const executeActionInServer = useCallback(
        async () => {

            // Se guardan los cambios en el formulario antes de ejecutar la acción
            await saveChanges();
            // Ejecución de la acción de servidor
            await api.server.action<K>(name, modelName, recordId);
            // Se recargan los datos
            await reload();
        }, [saveChanges, api, name, modelName, recordId, reload]
    );

    return { executeActionInServer };
};

const useActionNotify = (
    executeAction: () => Promise<void>,
    notify: string | undefined,
) => {

    // Obtención de valores desde el contexto
    const { onDoneOpen, setDoneMessage } = useContext(FormModalContext);

    // Inicialización de función que notifica tras la ejecución de la acción
    const executeAndNotify = useCallback(
        async () => {
            await executeAction();
            if ( notify ) {
                // Se establece el mensaje de notificación
                setDoneMessage(notify);
                // Se abre el modal
                onDoneOpen();
            };
        }, [executeAction, notify, onDoneOpen, setDoneMessage]
    );

    return { executeAndNotify };
};

const useActionConfirmation = (
    executeAndNotify: () => Promise<void>,
    confirm: string | undefined,
    color: IACele.UI.UIColor,
) => {

    // Obtención de valores desde el contexto
    const { onConfirmOpen, setExecute, setConfirmMessage, setColor } = useContext(FormModalContext);

    // Inicialización de función que confirma que se desea ejecutar la acción
    const executeWithConfirmation = useCallback(
        async () => {
            // Si existe un mensaje de confirmación...
            if ( confirm ) {
                // Se establece la función a ejecutar en el modal
                setExecute( () => (executeAndNotify) );
                // Se establece el mensaje de confirmación a mostrar
                setConfirmMessage(confirm);
                // Se establece el color del modal
                setColor(color);
                // Se abre el modal
                onConfirmOpen();

            // Si no existe mensaje de confirmación...
            } else {
                // Se ejecuta la función envuelta de acción directamente
                await executeAndNotify();
            };
        }, [color, confirm, executeAndNotify, onConfirmOpen, setColor, setConfirmMessage, setExecute]
    );

    return { executeWithConfirmation };
};
