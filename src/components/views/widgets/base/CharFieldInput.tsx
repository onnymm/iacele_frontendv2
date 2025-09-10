import { Input } from "@heroui/react";

const CharFieldInput = <M extends ModelName, T extends 'char' | 'text'>({
    name,
    decorationColor,
    type,
    value,
    placeholder,
    inputMode,
    onValueChange,
}: IACeleV2.Deprecated.ComponentWidget<M, T>) => {

    return (
        <Input
            spellCheck="false"
            id={name as string}
            variant="faded"
            color={decorationColor === 'default' ? 'primary' : decorationColor}
            placeholder={placeholder}
            size="sm"
            type={type}
            value={value ?? ''}
            inputMode={inputMode}
            onValueChange={onValueChange}
            classNames={{
                input: `${decorationColor === 'default' ? 'text-black dark:text-white' : `text-${decorationColor}-500`} focus:text-black dark:focus:text-white placeholder:text-slate-500 placeholder:font-light`,
            }}
        />
    );
};

export default CharFieldInput;
