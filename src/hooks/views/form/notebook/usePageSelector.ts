import { useCallback, useContext, useMemo } from "react";
import NotebookContext from "../../../../contexts/view/form/NotebookContext";

const usePageSelector = (
    index: number,
): IACeleV2.Hook.View.Form.PageSelector => {

    // Obtención de valores desde el contexto
    const { displayedPage, setDisplayedPage } = useContext(NotebookContext);

    // Se almacena valor de validación de si la pestaña está seleccionada
    const isSelected = useMemo(
        () => (
            displayedPage === index
        ), [displayedPage, index]
    );

    // Función para seleccionar página
    const selectPage = useCallback(
        () => {
            setDisplayedPage(index);
        }, [setDisplayedPage, index]
    );

    return { isSelected, selectPage };
};

export default usePageSelector;
