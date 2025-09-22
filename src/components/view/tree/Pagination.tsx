import { useCallback, useMemo } from "react";
import settings from "../../../settings/app";
import Button from "../../ui/buttons/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { NumberInput } from "@heroui/react";
import Sizeable from "../../common/Sizeable";

interface PaginationParams {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    itemsPerPage?: number;
    totalRecords: number;
};

const Pagination: React.FC<PaginationParams> = ({
    page,
    setPage,
    itemsPerPage = settings.view.defaultItemsPerPage,
    totalRecords,
}) => {

    // Obtención de funciones para el estado
    const { totalPages, setManualPage, nextPage, prevPage } = usePagination(setPage, itemsPerPage, totalRecords);

    // Si no hay un total de registros no se renderiza el componente
    if ( !totalRecords ) return null;

    return (
        <div className="flex gap-1">
            <Sizeable>
                {({ componentSize }) => (
                    <NumberInput
                        aria-label="pagination"
                        endContent={
                            <div className="pl-0 w-16 font-normal text-sm text-nowrap">
                                {` / ${totalPages}`}
                            </div>
                        }
                        value={page + 1}
                        onValueChange={setManualPage}
                        color="primary"
                        variant="faded"
                        size={componentSize}
                        hideStepper
                        classNames={{
                            inputWrapper: 'h-8 w-20',
                            input: 'pr-0 justify-items-end',
                        }}
                    />
                )}
            </Sizeable>
            <Button icon={ChevronLeft} onPress={prevPage} isAsync color="primary" isDisabled={page === 0} />
            <Button icon={ChevronRight} onPress={nextPage} isAsync color="primary" isDisabled={page === (totalPages - 1)} />
        </div>
    );
};

export default Pagination;

const usePagination = (
    setPage: React.Dispatch<React.SetStateAction<number>>,
    itemsPerPage: number,
    totalRecords: number,
) => {

    // Cálculo de total de páginas
    const totalPages = useMemo(
        () => {
            // Obtención de páginas completas
            const completePages = Math.floor(totalRecords / itemsPerPage);
            // Obtención de posible página parcial
            const partialPage = (totalRecords % itemsPerPage) > 0 ? 1 : 0;
            // Cálculo de total de páginas
            const totalPages = completePages + partialPage;

            return totalPages;
        }, [itemsPerPage, totalRecords]
    );

    // Función para establecer el número de página manualmente
    const setManualPage = useCallback(
        (value: number) => {
            // Si el número de página es negativo...
            if ( value < 0 ) {
                // Se establece el valor a cero
                setPage(0);
            // Si el número de página es mayor a la página máxima...
            } else if ( value > totalPages ) {
                // Se establece el valor a la página máxima
                setPage(totalPages - 1);
            // Si el valor está dentro del rango válido
            } else {
                // Se establece éste
                setPage(value - 1);
            };
        }, [setPage, totalPages]
    );

    // Función para cambiar a la página siguiente
    const nextPage = useCallback(
        () => {
            setPage(
                (value) => (
                    // Si la nueva página se sale del rango...
                    ( (value + 1) === totalPages )
                        // Se mantiene ésta
                        ? value
                        // Se aumenta el valor
                        : value + 1
                )
            );
        }, [setPage, totalPages]
    );

    // Función para cambiar a página anterior
    const prevPage = useCallback(
        () => {
            setPage(
                (value) => (
                    // Si el valor ya es igual a 0...
                    value === 0
                        // Se mantiene éste
                        ? 0
                        // Se disminuye el valor
                        : value - 1
                )
            );
        }, [setPage]
    );

    return { totalPages, setManualPage, nextPage, prevPage };
};
