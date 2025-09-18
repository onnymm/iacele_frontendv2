import { createContext } from "react";

const FormTreeContext = createContext<IACele.Context.View.FormTree<any, any, any>>({
    name: '',
    addConfig: () => null,
    setDataLoaded: () => null,
    treeConfig: [],
    fields: [],
    records: [],
    modelName: undefined,
});

export default FormTreeContext;
