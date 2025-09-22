import { useCallback, useContext } from "react";
import TreeContext from "../../../contexts/view/tree/TreeContext";
import { useNavigate } from "react-router";

const useOpenRecord = <M extends ModelName>() => {

    // Obtención de valor de dirección desde el contexto
    const { open } = useContext(TreeContext as React.Context<IACele.Context.View.List.Tree<M>>);
    // Obtención de función de navegación
    const navigateTo = useNavigate();

    // Inicialización de función que abre el registro
    const openRecord = useCallback(
        (id: number) => {
            // Si existe un valor de dirección...
            if ( open ) {
                // Se redirecciona a la ruta
                navigateTo(`${open}?id=${id}`);
            };
        }, [navigateTo, open]
    );

    return { openRecord };
};

export default useOpenRecord;
