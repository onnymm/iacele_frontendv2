import { createContext } from "react";

const RouteMemoryContext = createContext<IACele.Context.Application.Breadcrumb>({
    recentRoutes: [],
    addRoute: () => (null),
    cutRecent: () => (null),
    setRouteData: () => (null),
    recoverData: ( () => (null) ) as <T>() => T,
});

export default RouteMemoryContext;
