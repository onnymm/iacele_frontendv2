import { Chip, Switch } from "@heroui/react";
import widgetBuilder from "./widgetBuilder";
import { useState } from "react";
import useAPI from "../../hooks/app/useAPI";

const chip = widgetBuilder(
    ({ defaultValue: value, color }) => ( <Chip size="sm" color={color}> {value} </Chip> )
);

const toggle = widgetBuilder(
    ({
        defaultValue,
        defaultProp,
        table,
        record,
        color,
    }) => {

        const { api } = useAPI();

        const [ toggleValue, setToggleValue ] = useState<boolean>(defaultValue as boolean);

        const onValueChange = () => {
            setToggleValue( (prevState) => (!prevState) );
            api.update({
                table,
                recordId: (record.id as number),
                dataToWrite: {[ defaultProp ]: !toggleValue}
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
    ({defaultValue: value, color}) => (<Chip className="font-mono" size="sm" radius="sm" color={color}>{value}</Chip>)
);

// ----------------------------------------------------------------------------

const widgets = {
    chip,
    toggle,
    codeline,
};

export default widgets;
