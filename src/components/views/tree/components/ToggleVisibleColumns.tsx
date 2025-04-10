import { Button } from "@heroui/react";
import { KeyboardArrowDown, TableView } from "@mui/icons-material";
import LABEL from "../../../../constants/ui/list";
import SelectTemplate from "../../../ui/SelectTemplate";

const ToggleVisibleColumns: React.FC<IACele.UI.SelectOptions> = ({
    toggleableKeys,
    selectedKeys,
    setSelectedKeys,
}) => {

    return (
        <div>

            {/* Vista móvil */}
            {/* <div className="sm:hidden block">
                <SelectTemplate
                    selectionMode="multiple"
                    toggleableKeys={toggleableKeys}
                    selectedKeys={selectedKeys}
                    setSelectedKeys={setSelectedKeys}
                    trigger={
                        <Button
                            size='sm'
                            variant="solid"
                            className="bg-transparent"
                            startContent={<TableView className="outline-none" />}
                            endContent={<KeyboardArrowDown className="outline-none" />}
                        />
                    }
                />
            </div> */}

            {/* Vista de escritorio */}
            <div className="hidden sm:block">
                <SelectTemplate
                    selectionMode="multiple"
                    toggleableKeys={toggleableKeys}
                    selectedKeys={selectedKeys}
                    setSelectedKeys={setSelectedKeys}
                    trigger={
                        <Button
                            size='sm'
                            variant="solid"
                            className="bg-transparent"
                            startContent={<TableView className="outline-none" />}
                            endContent={<KeyboardArrowDown className="outline-none" />}
                        >
                            {LABEL.VISIBLE_COLUMNS}
                        </Button>
                    }
                />
            </div>

        </div>
    );
};

export default ToggleVisibleColumns;
