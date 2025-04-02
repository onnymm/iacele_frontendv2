import { createContext } from "react";

const SortingFieldContext = createContext<IACele.Context.SortingField>({
    sortingFieldKey: null,
    selectedSortingDirection: new Set(['asc']),
    toggleSortingColumn: () => null,
});

export default SortingFieldContext;
