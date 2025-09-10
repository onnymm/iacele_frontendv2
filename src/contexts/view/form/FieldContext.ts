import { createContext } from "react";

const FieldContext = createContext<IACeleV2.Context.View.Field<any>>({
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
