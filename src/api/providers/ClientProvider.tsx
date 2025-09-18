import React from "react";
import useAPI from "../../hooks/app/useAPI";
import APIContext from "../../contexts/apiContext";

const ClientProvider: React.FC<IACele.Application.Provider> = ({
    children,
}) => {

    // Inicialización de instancia de API y sus principales valores
    const { api, appLoading, setAppLoading } = useAPI();

    return (
        <APIContext.Provider value={{ api, appLoading, setAppLoading }}>
            {children}
        </APIContext.Provider>
    );
};

export default ClientProvider;
