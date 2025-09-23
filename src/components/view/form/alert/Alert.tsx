import { X } from "lucide-react";
import useAlert from "../../../../hooks/views/form/alert/useAlert";
import useIsInvisible from "../../../../hooks/views/form/field/useIsInvisible";
import useIsAuthorized from "../../../../hooks/views/form/useIsAuthorized";

const Alert = <M extends ModelName>({
    color,
    children,
    invisible,
    groups,
}: IACele.View.Form.Alert.Params<M>) => {

    // Obtención de valores para el componente
    const { show, close } = useAlert();
    // Cómputo de parámetro de invisibilidad
    const { computedIsInvisible } = useIsInvisible(invisible);
    // Obtención de si el usuario está autorizado para visualizar el componente
    const { computedIsAuthorized } = useIsAuthorized(groups);

    // Si el usuario no está autorizado para visualiar el componente se retorna un valor nulo
    if ( !computedIsAuthorized ) return null;

    if (!show || computedIsInvisible) return null;
    return (
        <div className={`border-${color}-500 font-light text-xs group-[.ui-form-header]:w-full h-8 items-center group-[.ui-form-header]:col-span-2 group-[.ui-form-header]:mx-0 mx-4 group-[.ui-group]:mx-0 border rounded-lg bg-${color}-500/10 py-2 text-${color}-500 flex justify-between px-4`}>
            {children}
            <button onClick={close}>
                <X className="size-4" />
            </button>
        </div>
    );
};

export default Alert;
