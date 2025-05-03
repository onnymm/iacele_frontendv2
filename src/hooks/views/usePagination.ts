import { useCallback, useContext, useMemo, useState } from "react";
import settings from "../../settings/app";
import BreadcrumbsContext from "../../contexts/breadcrumbsContext";

/** 
 *  ### Herramientas de paginación
 *  Este Custom Hook crea los estados, funciones de cambio de estado y
 *  funciones personalizadas para el manejo de paginación en listas de
 *  resultados, para vista de lista.
 */ 
const usePagination = (): IACele.View.Pagination.Setters => {

    // Obtención de función de cambio de estado desde el contexto
    const { recoverData } = useContext(BreadcrumbsContext)
    // Inicialización de conteo de registros
    const [ count, setCount ] = useState<number>(0);
    // Inicialización de registros por página
    const [ itemsPerPage ] = useState<number>(settings.view.defaultItemsPerPage);
    // Inicialización de estado de páginas
    const [ currentPage, setPage ] = useState<number>(
        () => {
            // Obtención de los datos desde la ruta
            const data = recoverData<{page: number}>();
            // Obtención del valor guardado para el estado
            if ( data.page ) return data.page;
            return 1;
        }
    );

    // Cálculo de cantidad de lotes paginados
    const totalPages = useMemo(
        () => {
            if ( count ) {
                const f = count / itemsPerPage;
                const e = Math.floor(f);
                const r = f - e > 0 ? 1 : 0;
                return e + r;
            } else {
                return 1;
            };
        }, [count, itemsPerPage]
    );

    // Página anterior
    const prevPage = useCallback(
            () => {
            if ( (currentPage - 1) > 0 ) setPage(currentPage - 1);
        }, [currentPage]
    );

    // Página siguiente
    const nextPage = useCallback(
            () => {
            if ( (currentPage + 1) <= totalPages ) setPage(currentPage + 1);
        }, [totalPages, currentPage]
    );

    return { count, setCount, itemsPerPage, currentPage, totalPages, prevPage, nextPage };
};

export default usePagination;
