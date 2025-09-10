import { createContext } from "react";

const FormTreeContext = createContext<IACeleV2.Context.View.FormTree<any, any, any>>({
    name: '',
    addConfig: () => null,
    setDataLoaded: () => null,
    treeConfig: [],
    fields: [],
    records: [],
    modelName: undefined,
});

export default FormTreeContext;
