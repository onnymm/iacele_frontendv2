import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";

const useIsAuthorized = (
    groups: string[] | undefined,
): IACele.Hook.View.Form.IsAuthorized => {

    // Inicialización de valor computado de autorizado
    let computedIsAuthorized: boolean = false;

    // Obtención de los grupos a los que el usuario pertenece
    const { userGroups } = useGroups();

    // Si no existe un valor de grupos autorizados...
    if ( groups === undefined ) {
        // Se establece el valor de autorizado a verdadero
        computedIsAuthorized = true;
    // Si existe un valor de grupos autorizados...
    } else {
        // Se comprueba que al menos un grupo exista en los grupos del usuario
        groups.forEach(
            (group) => {
                // Búsqueda del grupo autorizado
                const foundGroup = userGroups.find( (userGroup) => (userGroup === group) );
                // Si el grupo autorizado fue encontrado en los grupos del usuario...
                if ( foundGroup ) {
                    // Se establece el valor de autorizado a verdadero
                    computedIsAuthorized = true;
                };
            }
        );
    };

    return { computedIsAuthorized };
};

export default useIsAuthorized;

const useGroups = () => {

    // Obtención de los datos del usuario de la sesión activa
    const { userData } = useContext(UserContext);
    // Obtención de los grupos a los que el usuario pertenece
    const userGroups = userData.groups.map( (group) => (group.name) );

    return { userGroups };
};
