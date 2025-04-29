import { Checkbox, Chip, Switch } from "@heroui/react";
import widgetBuilder from "./widgetBuilder";
import { useContext, useState } from "react";
import Sizeable from "../common/Sizeable";
import APIContext from "../../contexts/apiContext";

const char = widgetBuilder(
    ({ defaultValue }) => (
        <Sizeable>
            {({ textSize }) => (
                <span className={textSize}>{defaultValue}</span>
            )}
        </Sizeable>
    )
);

const integer = widgetBuilder(
    ({ defaultValue }) => (
        <Sizeable>
            {({ textSize }) => (
                <span className={textSize}>{(defaultValue as number).toFixed(0)}</span>
            )}
        </Sizeable>
    )
);

const float = widgetBuilder(
    ({ defaultValue }) => (
        <Sizeable>
            {({ textSize }) => (
                <span className={textSize}>{(defaultValue as number).toFixed(2)}</span>
            )}
        </Sizeable>
    )
);

const check = widgetBuilder(
    ({ defaultValue, color }) => (
        <Sizeable>
            {({ view }) => (
                <Checkbox size={view === 'mobile' ? 'lg' : 'md'} color={color === 'default' ? 'primary' : color} isSelected={defaultValue as boolean} />
            )}
        </Sizeable>
    )
);

const chip = widgetBuilder(
    ({ defaultValue, color }) => (
        <Sizeable>
            {({ componentSize: defaultSize }) => (
                <Chip size={defaultSize} color={color}> {defaultValue} </Chip>
            )}
        </Sizeable>
    )
);

const toggle = widgetBuilder(
    ({
        defaultValue,
        defaultProp,
        table,
        record,
        color,
    }) => {

        const { api } = useContext(APIContext);

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
            <Sizeable>
                {({ componentSize }) => (
                    <Switch
                        size={componentSize}
                        color={color === 'default' ? 'primary' : color}
                        isSelected={toggleValue}
                        onValueChange={onValueChange}
                    />
                )}
            </Sizeable>
        );
    }
);

const codeline = widgetBuilder(
    ({ defaultValue, color }) => (
        <Sizeable>
            {({ componentSize, textSize }) => (
                <Chip className={`${textSize} font-mono`} size={componentSize} radius="sm" color={color}>{defaultValue}</Chip>
            )}
        </Sizeable>
    )
);

const monetary = widgetBuilder(
    ({ defaultValue }) => (
        <Sizeable>
            {({ textSize }) => (
                <div className={`${textSize} flex flex-row gap-1`}>
                    {defaultValue?.toLocaleString('es-MX', {style: 'currency', currency: 'MXN'})}
                </div>
            )}
        </Sizeable>
    )
);

const percentage = widgetBuilder(
    ({ defaultValue }) => (
        <Sizeable>
            {({ textSize }) => (
                <div className={`${textSize} flex flex-row gap-2`}>
                    {(defaultValue as number).toFixed(2)}
                    <span>%</span>
                </div>
            )}
        </Sizeable>
    )
);

// ----------------------------------------------------------------------------

const widgets = {
    char,
    integer,
    float,
    chip,
    toggle,
    codeline,
    monetary,
    percentage,
    check,
};

export default widgets;
