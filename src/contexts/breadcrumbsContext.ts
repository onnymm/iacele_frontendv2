import { createContext } from "react";

const RouteMemoryContext = createContext<IACele.Application.RouteMemory>({
    recentRoutes: [],
    addRoute: () => null,
    cutRecent: () => null,
    setRouteData: () => null,
    recoverData: ( () => null ) as <T>() => T,
});

export default RouteMemoryContext;
