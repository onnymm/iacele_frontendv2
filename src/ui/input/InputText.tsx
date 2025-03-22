import { Input } from "@heroui/react";
import { useState } from "react";

const InputText: React.FC<IACele.UI.CoreInput> = ({
    value,
    onValueChange,
    icon: Icon,
    endContent,
    label,
    type = 'text',
    name,
}) => {

    const [ isFocused, setIsFocused ] = useState<boolean>(false);

    return (
        <div className={`${isFocused ? 'border-primary-500' : 'border-gray-500/20 hover:border-primary-500/50'} relative h-10 border-2 rounded-lg transition-colors duration-100`}>
            <Input
                className={'border-none'}
                classNames={{input: `ml-6 pt-3 h-full ${type === 'password' ? 'tracking-[0.25em]' : ''}`, label: `font-semibold group-data-[focus-within=true]:text-primary-500 ml-6 group-data-[filled-within=true]:scale-85 group-data-[filled-within=true]:-translate-y-[calc(50%_+_theme(fontSize.tiny)/2_-_6px_-_theme(borderWidth.medium))] transition duration-100`, base: 'h-full', inputWrapper: 'border-none h-full py-0', }}
                label={label}
                size="sm"
                variant="bordered"
                type={type}
                value={value}
                onValueChange={onValueChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                endContent={endContent}
                name={name}
            />
            {Icon &&
                <div className="top-0 absolute flex flex-row items-center size-full pointer-events-none">
                    <Icon className={`${isFocused ? 'fill-primary-500' : 'fill-gray-500'} ml-2 min-w-6 h-6 transition-colors duration-100`} />
                </div>
            }
        </div>
    );
};

export default InputText;
