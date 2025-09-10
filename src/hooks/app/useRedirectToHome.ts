import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { TokenContext } from "../../contexts/tokenContext";

const useRedirectToHome = (): void => {

    // Obtención de valores de los contextos
    const navigate = useNavigate();
    const { userToken } = useContext(TokenContext);

    // Redirección a la página de inicio cuando el token se establece
    useEffect(
        () => {
            if ( !userToken ) navigate('/login');
        }, [userToken, navigate]
    );
};

export default useRedirectToHome;
