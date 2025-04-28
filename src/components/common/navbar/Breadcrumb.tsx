import { BreadcrumbItem, Breadcrumbs, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react"
import { MoreHoriz } from "@mui/icons-material";
import React, { useContext } from "react";
import PageNameContext from "../../../contexts/pageNameContext";
import BreadcrumbsContext from "../../../contexts/breadcrumbsContext";
import Link from "./Link";
import Sizeable from "../Sizeable";

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

            {/* Apariencia en escritorio */}
            <div className="hidden md:block">
                <Breadcrumbs
                    itemsAfterCollapse={2}
                    itemsBeforeCollapse={1}
                    maxItems={4}
                    renderEllipsis={
                        ({ items, separator }) => (
                            <div className="flex items-center" key={1}>
                                <Dropdown>
                                    <DropdownTrigger>
                                        <Button isIconOnly variant="solid" size="sm" endContent={<MoreHoriz className="pointer-events-none" />} />
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
            </div>

            {/* Apariencia en móvil */}
            <div className="md:hidden">
                {recentRoutes.length > 0 &&
                    <Sizeable>
                        {({ componentSize }) => (
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button isIconOnly variant="solid" size={componentSize} endContent={<MoreHoriz className="pointer-events-none" />} />
                                </DropdownTrigger>
                                <DropdownMenu>
                                    {recentRoutes.map(
                                        (item, i) => (
                                            <DropdownItem key={i} aria-label={String(i)}>
                                                <Link key={i} index={i} {...item} />
                                            </DropdownItem>
                                        )
                                    )}
                                </DropdownMenu>
                            </Dropdown>
                        )}
                    </Sizeable>
                }
            </div>

            {/* Título de la página actual */}
            <span className="hidden md:inline text-xs">{pageName}</span>
        </div>
    );
};

export default React.memo(Breadcrumb);
