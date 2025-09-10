import React from "react";
import ClientProvider from "../api/providers/ClientProvider";
import UserTokenProvider from "../providers/UserTokenProvider";
import UserDataProvider from "../providers/UserDataProvider";
import UserAuthenticationProvider from "../providers/UserAuthenticationProvider";

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
const AuthProvider: React.FC<IACeleV2.Application.Provider> = ({
    children,
}) => {

    return (
        <UserTokenProvider>
            <UserDataProvider>
                <ClientProvider>
                    <UserAuthenticationProvider>
                        {children}
                    </UserAuthenticationProvider>
                </ClientProvider>
            </UserDataProvider>
        </UserTokenProvider>
    );
};

export default AuthProvider;
