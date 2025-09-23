import { useContext, useEffect } from "react";
import NotebookContext from "../../../../contexts/view/form/NotebookContext";
import useIsInvisible from "../../../../hooks/views/form/field/useIsInvisible";
import useIsAuthorized from "../../../../hooks/views/form/useIsAuthorized";

const NotebookPage = <K extends ModelName>({
    label,
    children,
    invisible,
    groups,
}: IACele.View.Form.Notebook.Page.Params<K>) => {

    // Obtención de función desde el contexto del notebook
    const { addPageContent } = useContext(NotebookContext);
    // Cálculo de si el elemento debe ser invisible
    const { computedIsInvisible } = useIsInvisible(invisible);

    // Obtención de si el usuario está autorizado para visualizar el componente
    const { computedIsAuthorized } = useIsAuthorized(groups);

    // Se añade el contenido a una nueva página del notebook
    useEffect(
        () => {
            addPageContent(label, children, computedIsInvisible, computedIsAuthorized);
        }, [addPageContent, children, computedIsInvisible, label, computedIsAuthorized]
    );

    return null;
};

export default NotebookPage;
