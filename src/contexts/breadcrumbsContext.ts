import { createContext } from "react";

const BreadcrumbsContext = createContext<IACele.Application.Breadcrumbs>({
    recentRoutes: [],
    addRoute: () => null,
    cutRecent: () => null,
});

export default BreadcrumbsContext;
