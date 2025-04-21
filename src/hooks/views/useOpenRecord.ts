import { useCallback, useContext } from "react";
import OpenRecordPath from "../../contexts/OpenRecordPath";
import { useNavigate } from "react-router";

/** 
 *  ## Abrir registro
 *  Este Custom Hook crea una función que redirecciona hacia una ruta en donde
 *  se puede mostrar la vista detallada de un registro de lista.
 *  
 *  ### Retorno
 *  Este Custom Hook retorna:
 *  - [ `string | undefined` ] `recordPath`: Ruta de la vista detallada del
 *  registro en formulario.
 *  - [ `function` ]: `openRecord`: Función que redirecciona hacia la vista del
 *  registro en formulario.
 */ 
const useOpenRecord = () => {

    // Obtención de ruta a redireccionar
    const { open } = useContext(OpenRecordPath);

    // Obtención de función de navegación de rutas
    const navigate = useNavigate();

    // Función que redirecciona hacia la vista del registro en formulario
    const openRecord = useCallback(
        (id: number) => {
            if ( open ) navigate(`${open}?id=${id}`);
        }, [open, navigate]
    );

    return { recordPath: open, openRecord };
};

export default useOpenRecord;
