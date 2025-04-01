import { Button } from "@heroui/react"
import { MoreHoriz } from "@mui/icons-material";
import { useContext } from "react";
import PageNameContext from "../../../contexts/pageNameContext";

/** No implementado */
const Breadcrumb = () => {

    const { pageName } = useContext(PageNameContext);

    return (
        <div className="flex flex-col">
            <div className="hidden sm:flex flex-row gap-2">
                <span className="text-primary-500">Inicio</span>
                /
                <span className="text-primary-500">Menú</span>
            </div>
            <div className="sm:hidden">
                <Button endContent={<MoreHoriz />} isIconOnly />
            </div>
            <span className="hidden sm:inline text-xs">{pageName}</span>
        </div>
    )
}

export default Breadcrumb;
