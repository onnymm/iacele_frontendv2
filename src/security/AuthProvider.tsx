import { useEffect, useState } from "react";
import userTemplate from "../constants/userTemplate";
import fetchUser from "./fetchUser";
import { TokenContext } from "../contexts/tokenContext";
import { UserContext } from "../contexts/userContext";
import LOCAL_STORAGE from "../constants/app/localStorage";

/**
 *  ## Proveedor de autenticación
 *  Este componente envuelve toda la aplicación para poder obtener el token de
 *  autenticación del usuario y los datos de su perfil para el uso de esta.
 *  
 *  `< tsx >...</ tsx >` Contiene elementos hijos.
 *  
 *  ### Valores de contexto provistos:
 *  [ {} ]
 *  
 *  ### Parámetros de entrada:
 *  - [ {@link React.JSX.Element} ] `children`: Componente de aplicación a
 *  envolver.
 */ 
const AuthProvider: React.FC<GenericInvolverComponent> = ({
    children,
}) => {

    // Se intenta obtener el token desde el dispositivo
    const [ token, setToken ] = useState<string | null>( localStorage.getItem(LOCAL_STORAGE.USER_TOKEN) );

    // Inicialización del usuario actual
    const [ user, setUser ] = useState<IACele.Application.CurrentUserData>(userTemplate);

    // Intento de obtención del usuario
    useEffect(
        () => {
            fetchUser({ token, setToken, setUser });
        }, [token]
    );

    // Almacenamiento o remoción de token
    useEffect(
        () => {
            if ( token ) {
                localStorage.setItem(LOCAL_STORAGE.USER_TOKEN, token );
            } else {
                localStorage.removeItem(LOCAL_STORAGE.USER_TOKEN);
            }
        }, [token]
    );

    return (
        <TokenContext.Provider value={{token, setToken}}>
            <UserContext.Provider value={user}>
                { children }
            </UserContext.Provider>
        </TokenContext.Provider>
    );
};

export default AuthProvider;
