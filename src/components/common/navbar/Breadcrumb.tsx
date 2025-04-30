import { BreadcrumbItem, Breadcrumbs, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react"
import { MoreHoriz } from "@mui/icons-material";
import React, { useContext } from "react";
import PageNameContext from "../../../contexts/pageNameContext";
import BreadcrumbsContext from "../../../contexts/breadcrumbsContext";
import Link from "./Link";

/** 
 *  ## Migas de pan
 *  Este componente renderiza las rutas recientes visitadas en la aplicación.
 */ 
const Breadcrumb = () => {

    // Obtención de nombre de página desde el contexto
    const { pageName } = useContext(PageNameContext);
    // Obtención de arreglo de rutas recientes
    const { recentRoutes } = useContext(BreadcrumbsContext);

    return (
        <div className="flex flex-col">
                <Breadcrumbs
                    itemsAfterCollapse={2}
                    itemsBeforeCollapse={1}
                    maxItems={4}
                    renderEllipsis={
                        ({ items, separator }) => (
                            <div className="flex items-center" key={1}>
                                <Dropdown>
                                    <DropdownTrigger>
                                        <Button className="h-5" isIconOnly variant="solid" size="sm" endContent={<MoreHoriz className="pointer-events-none" />} />
                                    </DropdownTrigger>
                                    <DropdownMenu>
                                        {items.map(
                                            (item, i) => (
                                                <DropdownItem key={i} aria-label={String(i)}>
                                                    {item.children}
                                                </DropdownItem>
                                            )
                                        )}
                                    </DropdownMenu>
                                </Dropdown>
                                {separator}
                            </div>
                        )
                    }
                >
                    {
                        recentRoutes.map(
                            (route, i) => {
                                return (
                                    <BreadcrumbItem key={i}>
                                        <Link name={route.name} to={0 - (recentRoutes.length - i )} index={i} />
                                    </BreadcrumbItem>
                                )
                            }
                        )
                    }
                </Breadcrumbs>

            {/* Título de la página actual */}
            <span className="inline text-xs">{pageName}</span>
        </div>
    );
};

export default React.memo(Breadcrumb);
