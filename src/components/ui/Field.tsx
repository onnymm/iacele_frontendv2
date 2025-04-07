import useField from "../../hooks/views/useField";
import InputField from "./field/InputField";

const Field = <T extends IACele.API.Database.TableName>({
    name,
    label,
    readonly,
}: IACele.UI.Field<T>): React.JSX.Element => {

    const { record, computedLabel, computedType, computedRedonly, valueValidation, errorMessage, isInvalid, setValue } = useField(name, label, readonly);

    return (
        <div className="w-full group-[.ui-view-section]:w-min max-w-full overflow-x-hidden">
            <span className="hidden group-[.ui-view-form]:inline w-full h-8 text-primary-500 text-xs">{computedLabel}</span>
            {!computedRedonly
                ? (
                    <InputField
                        type={computedType}
                        defaultValue={(record as IACele.API.DataTypes.GenericRecord)[name as string] as string}
                        valueValidation={valueValidation}
                        errorMessage={errorMessage}
                        isInvalid={isInvalid}
                        setValue={setValue}
                    />
                )
                : (
                    <div className="flex flex-row items-center w-full h-8 overflow-x-hidden text-sm text-ellipsis text-nowrap">{(record as IACele.API.DataTypes.GenericRecord)[name]}</div>
                )
            }
        </div>
    )
}

export default Field;
