import FieldContext from "../../../../contexts/view/form/FieldContext";
import useFormRecordContext from "../../hooks/useFormRecordContext";
import Widgets from "../../Widgets";
import TreeWrapper from "../tree/TreeWrapper";
import useComputedFieldProps from "../useComputedFieldProps";
import FormField from "./FormField";

const Field = <
    M extends ModelName,
    F extends IACele.Data.Models.FieldName<M>
>({
    name,
    label,
    readonly,
    invisible,
    decoration,
    placeholder,
    min,
    max,
    step,
    widget,
    domain = [],
    children,
}: IACele.View.Form.Field.Params<M, F>) => {

    // Obtención de los datos computados para renderizar el campo
    const {
        computedDecorationColor,
        computedIsInvisible,
        computedLabel,
        computedReadonly,
        ttype,
    } = useComputedFieldProps<M>(name, label, readonly, invisible, decoration);

    // Obtención de los datos del formulario
    const { formRecord, formMode } = useFormRecordContext<M>();

    // Si el campo se computa como invisible se retorna un valor nulo
    if ( computedIsInvisible ) return null;

    // Si el componente no contiene elementos hijos se renderiza como campo individual del formulario
    if ( children === undefined ) {

        // Obtención del widget a renderizar
        const Widget = Widgets[(widget ?? ttype) as 'char'];

        return (
            <FieldContext.Provider value={{ name, computedLabel, placeholder, computedReadonly, ttype, computedDecorationColor, domain, min, max, step, }}>
                <FormField Widget={Widget} computedLabel={computedLabel} name={name} />
            </FieldContext.Provider>
        );

    // Si el componente contiene elementos hijos se renderiza
    } else {

        return (
            <FieldContext.Provider value={{ name, computedLabel, placeholder, computedReadonly, ttype, computedDecorationColor, domain, min, max, step, }}>
                {(formRecord[name] as IACele.Data.Models.TType.One2Many<M>)?.length && formMode === 'read' &&
                    <TreeWrapper config={children} />
                }
            </FieldContext.Provider>
        );
    };
};

export default Field;
