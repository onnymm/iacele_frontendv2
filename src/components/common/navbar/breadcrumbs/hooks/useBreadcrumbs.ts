import { useContext } from "react";
import PageNameContext from "../../../../../contexts/pageNameContext";
import RouteMemoryContext from "../../../../../contexts/breadcrumbsContext";

const useBreadcrumbs = (): IACeleV2.Hook.Application.Breadcrumbs => {

    // Obtención de nombre de página desde el contexto
    const { pageName } = useContext(PageNameContext);
    // Obtención de arreglo de rutas recientes
    const { recentRoutes } = useContext(RouteMemoryContext);

    return { pageName, recentRoutes };
};

export default useBreadcrumbs;
