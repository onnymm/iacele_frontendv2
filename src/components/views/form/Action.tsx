import { useContext } from "react"
import RecordFormContext from "../../../contexts/recordFormContext"
import useAPI from "../../../hooks/app/useAPI";
import { Button } from "@heroui/react";
import Sizeable from "../../common/Sizeable";

const Action = <K extends IACele.API.Database.TableName>({
    name,
    execute,
    invisible: invisible = () => true,
    color,
}: IACele.View.Form.Action<K>) => {

    // Obtención de tabla, registro y estado de carga
    const { table, record, reload } = useContext(RecordFormContext);
    // Obtención de instancia de API
    const { api } = useAPI();

    const executeCallback = async () => {
        // Ejecución de la acción en el backend
        const response = await api.action({ table, recordIds: record.id, action: execute });
        // Si la acción se ejecutó correctamente se realiza una recarga de los datos del formulario
        if ( response ) reload();
    };

    // Si la validación de invisible no es verdadera se renderiza el componente
    if ( !invisible(record) )
    return (
        <Sizeable>
            {({ componentSize }) => (
                <Button onPress={executeCallback} size={componentSize} variant="solid" color={color}>
                    {name}
                </Button>
            )}
        </Sizeable>
    );
};

export default Action;
