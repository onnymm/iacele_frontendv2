import RouteMemoryContext from "../contexts/breadcrumbsContext";
import useRouteMemory from "../hooks/app/useRouteMemory";

const BreadcrumbsProvider: React.FC<IACele.Application.Provider> = ({
    children,
}) => {

    // Inicialización de estados y funciones personalizadas para breadcrumbs
    const { recentRoutes, addRoute, cutRecent, setRouteData, recoverData } = useRouteMemory();

    return (
        <RouteMemoryContext.Provider value={{ recentRoutes, addRoute, cutRecent, setRouteData, recoverData }}>
            {children}
        </RouteMemoryContext.Provider>
    );
};

export default BreadcrumbsProvider;
