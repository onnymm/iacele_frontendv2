import { useState } from "react";
import APP_NAME from "../constants/app/name";
import PageNameContext from "../contexts/pageNameContext";

const PageNameProvider: React.FC<IACele.Application.Provider> = ({
    children,
}) => {

    // Inicialización de nombre de página
    const [ pageName, setPageName ] = useState<string | null>(APP_NAME);

    return (
        <PageNameContext.Provider value={{ pageName, setPageName }}>
            {children}
        </PageNameContext.Provider>
    );
};

export default PageNameProvider;
