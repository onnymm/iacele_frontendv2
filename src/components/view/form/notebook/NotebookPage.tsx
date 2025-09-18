import { useContext, useEffect } from "react";
import NotebookContext from "../../../../contexts/view/form/NotebookContext";
import useIsInvisible from "../../../../hooks/views/form/field/useIsInvisible";

const NotebookPage = <K extends ModelName>({
    label,
    children,
    invisible,
}: IACele.View.Form.Notebook.Page.Params<K>) => {

    // Obtención de función desde el contexto del notebook
    const { addPageContent } = useContext(NotebookContext);
    // Cálculo de si el elemento debe ser invisible
    const { computedIsInvisible } = useIsInvisible(invisible);

    // Se añade el contenido a una nueva página del notebook
    useEffect(
        () => {
            addPageContent(label, children, computedIsInvisible);
        }, [addPageContent, children, computedIsInvisible, label]
    );

    return null;
};

export default NotebookPage;
