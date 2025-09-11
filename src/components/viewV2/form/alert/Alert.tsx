import { X } from "lucide-react";
import useAlert from "../../../../hooks/views/form/alert/useAlert";
import useIsInvisible from "../../hooks/useIsInvisible";

const Alert = <M extends ModelName>({
    color,
    children,
    invisible,
}: IACeleV2.View.Form.Alert.Params<M>) => {

    // Obtención de valores para el componente
    const { show, close } = useAlert();
    // Cómputo de parámetro de invisibilidad
    const { computedIsInvisible } = useIsInvisible(invisible);

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
