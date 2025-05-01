import { useContext, useMemo } from "react";
import APIContext from "../../../contexts/apiContext";
import { useNavigate } from "react-router";
import useActionModal from "../../../hooks/views/useConfirmModal";
import Sizeable from "../../common/Sizeable";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { MoreVertRounded } from "@mui/icons-material";

const Options = <K extends IACele.API.Database.TableName>({
    id,
    table,
    canDelete,
}: IACele.View.Form.Options<K>) => {

    // Obtención de instancia y función desde contexto
    const { api } = useContext(APIContext);
    const navigate = useNavigate();

    // Inicialización de función para eliminar registro
    const deleteCallback = async () => {
        await api.delete<K>({ table, recordIds: id });
        navigate(-1);
    };

    // Se envuelve la función para abrir modal
    const { executeWithConfirmation: wrappedDeleteCallback } = useActionModal(
        deleteCallback,
        '¿Deseas eliminar este registro?',
        undefined,
        'danger',
    );

    // Creación de arreglo de opciones del registro
    const callbackOptions = useMemo(
        () => {
            // Inicialización de arreglo de opciones
            const callbacks: (() => void)[] = [];
            // Si el registro se puede eliminar se añade la función a las opciones
            if ( canDelete ) callbacks.push(wrappedDeleteCallback);
            // Retorno de la matriz creada
            return (callbacks);
        }, [canDelete, wrappedDeleteCallback]
    )

    // Si existen opciones a mostrar
    if ( callbackOptions.length ) {
        return (
            <Sizeable>
                {({ componentSize }) => (
                    <Dropdown>
                        <DropdownTrigger>
                            <Button size={componentSize} isIconOnly>
                                <MoreVertRounded className="pointer-events-none" />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                            <DropdownItem color="danger" onPress={wrappedDeleteCallback} key='delete'>{'Eliminar'}</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                )}
            </Sizeable>
        );
    };
};

export default Options;
