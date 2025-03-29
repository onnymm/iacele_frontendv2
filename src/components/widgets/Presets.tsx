import { Chip, Switch } from "@heroui/react";
import widgetBuilder from "./widgetBuilder";
import { useState } from "react";
import api from "../../api/api";

const chip = widgetBuilder(
    ({ value, color }) => ( <Chip size="sm" color={color}> {value} </Chip> )
);

const toggle = widgetBuilder(
    ({
        value,
        key,
        tableName,
        record,
        color,
    }) => {

        const [ toggleValue, setToggleValue ] = useState<boolean>(value as boolean);

        const onValueChange = () => {
            setToggleValue( (prevState) => (!prevState) );
            api.update({
                tableName: (tableName),
                recordId: (record.id as number),
                dataToWrite: {[ key ]: !toggleValue}
            });
        };

        return (
            <Switch
                size="sm"
                color={color === 'default' ? 'primary' : color}
                isSelected={toggleValue}
                onValueChange={onValueChange}
            />
        );
    }
);

const codeline = widgetBuilder(
    ({value, color}) => (<Chip className="font-mono" size="sm" radius="sm" color={color}>{value}</Chip>)
);

// ----------------------------------------------------------------------------

const widgets: IACele.Core.Widget.WidgetPreset = {
    chip,
    toggle,
    codeline,
};

export default widgets;
