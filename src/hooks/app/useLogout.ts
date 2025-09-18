import { useCallback, useContext } from "react";
import { TokenContext } from "../../contexts/tokenContext";

const useLogout = (): IACele.Application.Logout => {

    // Obtención de función de manipulación de token desde contexto
    const { setUserToken } = useContext(TokenContext);

    // Inicialización de función de cierre de sesión
    const logout = useCallback(
        () => {
            // Se elimina el token
            setUserToken(null);
        }, [setUserToken]
    );

    return { logout };
};

export default useLogout;
