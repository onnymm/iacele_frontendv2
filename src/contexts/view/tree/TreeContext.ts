import { createContext } from "react";

const TreeContext = createContext<IACele.Context.View.List.Tree<any>>({
    modelName: undefined,
    addConfig: () => (null),
    config: [],
    dataFromAPI: [],
    metadataFromAPI: [],
    totalRecords: 0,
    dataLoaded: false,
    modelLabel: '',
    open: '',
    create: true,
});

export default TreeContext;
