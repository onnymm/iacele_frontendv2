import { SwapVertRounded, TableViewRounded } from "@mui/icons-material"
import SelectTemplate from "../../ui/SelectTemplate"
import { Button } from "@heroui/react";
import Sizeable from "../../common/Sizeable";

/** 
 *  ### Selección de campos de ordenamiento
 *  Este componente renderiza dos botones de selección para establecer el campo
 *  de ordenamiento de datos así como la dirección de ordenamiento para la
 *  vista de lista, en específico, para la vista de Kanban.
 */ 
const SortFields = <K extends IACele.API.Database.TableName>({
    selectedSortingDirection,
    sorteableFields,
    kanbanSortingField,
    setKanbanSortingField,
    setSelectedSortingDirection,
}: (
    & IACele.View.Tree._HasSortingDirection
    & IACele.Hook._SortingFieldHandling<K>
    & IACele.Hook._SortingDirectionHandling
)) => {

    return (
        <Sizeable>
            {({ componentSize }) => (
                <div className="flex flex-row items-center gap-1">
                    <SelectTemplate
                        selectionMode="single"
                        toggleableKeys={sorteableFields as unknown as {name: K, label: string}[]}
                        selectedKeys={kanbanSortingField as Set<string>}
                        setSelectedKeys={setKanbanSortingField as (keys: IACele.UI._SharedSelection) => void}
                        trigger={
                            <Button
                                className="bg-transparent"
                                size={componentSize}
                                isIconOnly
                                startContent={<TableViewRounded className="outline-none" />}
                            />
                        }
                    />
                    <SelectTemplate
                        selectionMode="single"
                        toggleableKeys={[{name: 'asc', label: 'Acendente'}, {name: 'desc', label: 'Descendente'}]}
                        selectedKeys={selectedSortingDirection}
                        setSelectedKeys={setSelectedSortingDirection as (keys: IACele.UI._SharedSelection) => void}
                        trigger={
                            <Button
                                className="bg-transparent"
                                size={componentSize}
                                isIconOnly
                                isDisabled={kanbanSortingField.size === 0}
                                startContent={<SwapVertRounded className="outline-none" />}
                            />
                        }
                    />
                </div>
            )}
        </Sizeable>
    );
};

export default SortFields;
