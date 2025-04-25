import { KeyboardArrowDownRounded, TableViewRounded } from "@mui/icons-material";
import SelectTemplate from "../../ui/SelectTemplate";
import LABEL from "../../../constants/ui/list";
import { Button } from "@heroui/react";

/** 
 *  ## Selección de columnas visibles
 *  Este componente renderiza el botón de selección que muestra y oculta
 *  columnas de la vista de árbol.
 */ 
const SelectVisibleColumns = <K extends IACele.API.Database.TableName>({
    visibleColumnsKeys,
    toggleableColumns,
    setVisibleColumnsKeys,
}: IACele.Hook._ColumnsVisibilityHandling<K>) => {

    return (
        <SelectTemplate
            selectionMode="multiple"
            toggleableKeys={toggleableColumns as unknown as {name: K, label: string}[]}
            selectedKeys={visibleColumnsKeys as Set<string>}
            setSelectedKeys={setVisibleColumnsKeys}
            trigger={
                <Button
                    size="sm"
                    className="bg-transparent"
                    startContent={<TableViewRounded className="outline-none" />}
                    endContent={<KeyboardArrowDownRounded className="outline-none" />}
                >
                    {LABEL.VISIBLE_COLUMNS}
                </Button>
            }
        />
    );
};

export default SelectVisibleColumns;
