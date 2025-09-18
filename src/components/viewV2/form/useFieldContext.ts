import { useContext } from "react";
import FieldContext from "../../../contexts/view/form/FieldContext";

const useFieldContext = <M extends ModelName>(): IACele.Context.View.Field<M> => {

    // Obtención de valores desde el contexto del campo
    const {
        computedDecorationColor,
        computedLabel,
        computedReadonly,
        domain,
        name,
        ttype,
        placeholder,
        min,
        max,
        step,
    } = useContext(FieldContext) as IACele.Context.View.Field<M>

    return {
        computedDecorationColor,
        computedLabel,
        computedReadonly,
        domain,
        name,
        ttype,
        placeholder,
        min,
        max,
        step,
    };
};

export default useFieldContext;
