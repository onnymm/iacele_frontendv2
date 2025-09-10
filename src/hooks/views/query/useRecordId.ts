import { useMemo } from "react";
import { useSearchParams } from "react-router";

const useRecordId = (): { recordId: number } => {
    // Obtención de parámetros de query
    const [ searchParams ] = useSearchParams();
    // Obtención de la ID del registro
    const recordId = useMemo(
        () => (
            Number( searchParams.get('id') )
        ), [searchParams]
    );

    return { recordId };
};

export default useRecordId;
