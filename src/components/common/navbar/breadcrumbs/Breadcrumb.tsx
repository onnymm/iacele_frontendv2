import React from "react";
import useBreadcrumbs from "./hooks/useBreadcrumbs";
import BreadcrumbRoutes from "./BreadcrumbRoutes";

/** 
 *  ## Migas de pan
 *  Este componente renderiza las rutas recientes visitadas en la aplicación.
 */ 
const Breadcrumb = () => {

    // Obtención de valores desde el contexto
    const { pageName, recentRoutes } = useBreadcrumbs();

    return (
        <div className="flex flex-col">
            <BreadcrumbRoutes recentRoutes={recentRoutes} />

            {/* Título de la página actual */}
            <span className="inline text-xs">
                {pageName}
            </span>
        </div>
    );
};

export default React.memo(Breadcrumb);
