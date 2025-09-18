import FieldInfo from "./FieldInfo";

const FormField = <M extends ModelName>({
    name,
    computedLabel,
    Widget
}: IACele.View.Form.Field.FormFieldParams<M>) => {

    return (
        <div className="gap-2 grid grid-cols-3 md:col-span-2 group-[.ui-group]:col-span-1 px-4 group-[.ui-group]:px-0 py-1 w-full max-w-full overflow-hidden">
            <div className="flex items-center gap-1 pr-4 w-full h-8 text-primary-500">
                <span className="inline-block items-center text-xs">
                    {computedLabel}
                    <div className="inline-block w-1" />
                    <span className="inline-block">
                        <FieldInfo name={name} />
                    </span>
                </span>
            </div>
            <div className="flex items-center col-span-2 min-h-8">
                <Widget />
            </div>
        </div>
    );
};

export default FormField;
