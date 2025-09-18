const GenericReadonlyField = <K extends ModelName, T extends 'char' | 'integer' | 'float' | 'selection' | 'date' | 'datetime' | 'time' | 'duration' |'text'>({
    value,
    decorationColor,
}: {
    value: IACele.Deprecated.SupportedType<K, T>;
    decorationColor: IACele.UI.HeroUIColor;
}) => {

    // Color de decoración
    const decorationColorClassName = decorationColor !== 'default' ? `text-${decorationColor}-500` : '';

    return (
        <div className={`${decorationColorClassName} flex flex-row items-center w-full h-8 overflow-x-hidden text-sm text-ellipsis text-nowrap`}>
            {value as string}
        </div>
    );
};

export default GenericReadonlyField;
