import React, { useCallback, useEffect, useMemo, useState } from "react";

const useNotebook = (): IACele.Hook.View.Form.Notebook => {

    // Inicialización de estado de contenido de páginas
    const [ pages, setPages ] = useState<IACele.View.Form.Notebook.Object.PageContent[]>([]);
    // Inicialización de estado de índice de página mostrada
    const [ displayedPage, setDisplayedPage ] = useState<number>(0);
    // Inicialización de estado de cambios
    const [ changes, setChanges ] = useState<boolean>(false);
    // Inicialización de estado de listo para mostrar
    const [ readyToDisplay, setReadyToDisplay ] = useState<boolean>(false);
    // Inicialización de contenido de página a mostrar
    const pageContent = useMemo<React.ReactNode>(
        () => (
            pages[displayedPage]?.content
        ), [pages, displayedPage]
    );
    // Inicialización de datos para selectores de páginas
    const pagesData = useMemo<IACele.View.Form.Notebook.Object.PageData[]>(
        () => (
            pages.map(
                ({ label, invisible }) => ({ label, invisible })
            )
        ), [pages]
    );

    // Inicialización de función para añadir contenido a notebook
    const addPageContent = useCallback<IACele.View.Form.Notebook.Callback.SetPageContent>(
        (label, content, invisible) => {

            // Creación de copia de los datos
            const pagesCopy = [ ...pages ];
            // Búsqueda de datos existentes
            const existentData = pagesCopy.find( (page) => (page.label === label) );

            // Si existen datos agregados...
            if ( existentData ) {
                // Si existen cambios...
                if ( existentData.label !== label || existentData.invisible !== invisible ) {
                    // Se intentan actualizar los datos
                    existentData.label = label;
                    existentData.invisible = invisible;
                    // Se actualiza el estado
                    setPages(pagesCopy);
                };

            // Si no existen los datos...
            } else {

                // Se crea un nuevo objeto de datos para ser añadido
                const data: IACele.View.Form.Notebook.Object.PageContent = { label, content, invisible };
                // Actualización del estado
                setPages([ data, ...pagesCopy ]);
            };
        }, [pages]
    );

    // Inicialización de función para ejecutar una recarga del componente
    const reloadNotebook = useCallback(
        () => {
            setChanges( (value) => (!value) );
        }, []
    );

    // Se reinicia el estado de páginas si se detectan cambios en los componentes hijos
    useEffect(
        () => {
            setPages([]);
            setReadyToDisplay(false);
        }, [changes]
    );

    // Si la página a mostrar es invisible, se reinicia el índice a 0 ó 1
    useEffect(
        () => {
            // Si existen datos en la página a mostrar pero si estado es invisible
            if ( pages[displayedPage] && pages[displayedPage].invisible ) {
                // Se cambia la página a mostrar a 0. En caso de que ya era 0, se cambia a 1
                setDisplayedPage(displayedPage > 0 ? 0 : 1);
            };
        }, [pages, displayedPage]
    );

    // Efecto para indicar que el componente está listo para renderizarse
    useEffect(
        () => {
            // Si existen datos en la página a mostrar y existe contenido en ésta...
            if ( pages[displayedPage] && pages[displayedPage].content ) {
                // Se establece el estado de listo para mostrar a verdadero
                setReadyToDisplay(true);
            };
        }, [pages, displayedPage]
    );

    return { readyToDisplay, pageContent, addPageContent, reloadNotebook, pagesData, displayedPage, setDisplayedPage };
};

export default useNotebook;
