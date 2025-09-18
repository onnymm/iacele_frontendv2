import useNotebook from "../../../hooks/views/form/notebook/useNotebook";
import NotebookContext from "../../../contexts/view/form/NotebookContext";
import NotebookPage from "./notebook/NotebookPage";
import PageSelector from "./notebook/PageSelector";
import Pages from "./notebook/Pages";

const Notebook = <M extends ModelName>({
    children,
}: IACele.View.Form.Notebook.Params<M>) => {

    // Obtención de valores y funciones
    const {
        readyToDisplay,
        pageContent,
        addPageContent,
        reloadNotebook,
        pagesData,
        displayedPage,
        setDisplayedPage,
    } = useNotebook();

    return (
        <NotebookContext.Provider value={{ addPageContent, reloadNotebook, displayedPage, setDisplayedPage }}>

            {/* Carga de los datos */}
            {children({ Page: NotebookPage, Pages })}

            {/* Componente */}
            {readyToDisplay &&
                <div className="flex flex-col md:col-span-2 pt-2">
                    <div className="relative flex h-8">
                        <div className="absolute border-gray-500/30 border-b size-full pointer-events-none"/>
                        <div className="flex px-4 group-[.ui-group]:px-0">
                            {pagesData.map(
                                ({ label, invisible }, key) => (
                                    <PageSelector
                                        key={key}
                                        label={label}
                                        invisible={invisible}
                                        index={key}
                                    />
                                )
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 group-[.ui-group]:grid-cols-1 pt-0 h-min">
                        {pageContent}
                    </div>
                </div>
            }
        </NotebookContext.Provider>
    );
};

export default Notebook;
