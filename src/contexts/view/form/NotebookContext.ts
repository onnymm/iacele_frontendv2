import { createContext } from "react";

const NotebookContext = createContext<IACeleV2.Context.View.Notebook>({
    addPageContent: () => (null),
    reloadNotebook: () => (null),
    displayedPage: 0,
    setDisplayedPage: () => (null),
});

export default NotebookContext;
