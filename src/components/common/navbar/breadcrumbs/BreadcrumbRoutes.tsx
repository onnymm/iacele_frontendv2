import { BreadcrumbItem, Breadcrumbs } from "@heroui/react";
import BreadcrumbsEllipsis from "./BreadcrumbEllipsis";
import BreadcrumbRoute from "./BreadcrumbRoute";

const BreadcrumbRoutes: React.FC<IACele.UI.Breadcrumbs.Routes> = ({
    recentRoutes,
}) => {

    return (
        <Breadcrumbs
        itemsBeforeCollapse={1}
            itemsAfterCollapse={2}
            maxItems={4}
            renderEllipsis={
                ({ items, separator }) => (
                    <BreadcrumbsEllipsis
                        items={items}
                        separator={separator}
                    />
                )
            }
        >
            {
                recentRoutes.map(
                    (route, i) => {
                        return (
                            <BreadcrumbItem key={i}>
                                <BreadcrumbRoute name={route.name} to={0 - (recentRoutes.length - i )} index={i} />
                            </BreadcrumbItem>
                        )
                    }
                )
            }
        </Breadcrumbs>
    );
};

export default BreadcrumbRoutes;
