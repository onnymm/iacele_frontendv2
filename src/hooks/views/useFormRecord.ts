import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import useViewName from "../app/usePageName";
import useAPI from "../app/useAPI";
import Form from "../../components/views/form/Form"; // eslint-disable-line

interface RecordOrNull<K extends IACele.API.Database.TableName> {
    /** 
     *  ### Registro en base de datos
     *  Este objeto es la declaración de propiedades de un registro de una tabla
     *  dinámica de base de datos.
     */ 
    record: IACele.View.RecordInDatabase<K> | null;
}

/** 
 *  ## Registro de formulario
 *  Este Custom Hook obtiene la ID del registro a mostrar desde los parámetros
 *  query y realiza la solicitud de datos al backend para obtener la
 *  información del registro y retornarlo para su uso en una vista del
 *  componente {@link Form}.
 *  
 *  ### Parámetros de entrada
 *  - [ {@link IACele.API.Database.TableName TableName} ] `table`: Nombre de
 *  la tabla de donde se obtendrán los datos del registro en base a la ID
 *  obtenida.
 *  
 *  ### Retorno
 *  Este Custom Hook retorna:
 *  - [ {@link IACele.View.RecordInDatabase RecordInDatabase} ] `record`:
 *  Objeto que contiene la información a renderizar en la vista.
 */ 
const useFormRecord = <K extends IACele.API.Database.TableName>(
    table: K,
): RecordOrNull<K> => {

    // Obtención de parámetros de query
    const [ searchParams ] = useSearchParams();

    // Obtención de la ID del registro
    const id = useMemo(
        () => (
            Number( searchParams.get('id') )
        ), [searchParams]
    );

    // Obtención de la función de cambio de estado para establecer el nombre de la vista
    const { setViewName } = useViewName();
    // Obtención de instancia de API
    const { api } = useAPI();

    // Inicialización de estado del registro
    const [ record, setRecord ] = useState<IACele.View.RecordInDatabase<K> | null>(null);

    // Función para mostrar los datos en la vista
    const fetchData = useCallback(
        async () => {

            // Obtención de los datos desde el backend
            const record = await api.read<K>({
                id,
                table,
            });

            // Se establece el valor del registro
            setRecord(record);
        }, [id, table, api]
    );

    // Ejecución de función para mostrar los datos
    useEffect(
        () => {
            fetchData();
        }, [fetchData]
    );

    // Se establece el nombre de la vista
    useEffect(
        () => {
            if ( record ) setViewName(record.name as string);
        }, [record, setViewName]
    );

    return { record };
};

export default useFormRecord;
