import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { Ellipsis } from "lucide-react";

const BreadcrumbsEllipsis = ({
    items,
    separator,
}: IACeleV2.UI.Breadcrumbs.Ellipsis) => {

    return (
        <div className="flex items-center" key={1}>
            <Dropdown>
                <DropdownTrigger>
                    <Button
                        className="h-5"
                        isIconOnly
                        variant="solid"
                        size="sm"
                    >
                        <Ellipsis className="pointer-events-none" />
                    </Button>
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
    );
};

export default BreadcrumbsEllipsis;
