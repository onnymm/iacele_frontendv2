import { createContext } from "react";

const FieldContext = createContext<IACele.Context.View.Field<any>>({
    name: '',
    computedLabel: '',
    computedReadonly: false,
    ttype: 'boolean',
    computedDecorationColor: 'primary',
    domain: [],
    placeholder: undefined,
    widget: undefined,
})

export default FieldContext;
