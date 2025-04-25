import { useRef, useState } from "react";
import useEventListener from "../../../hooks/app/useEventListener";
import Button from "../Button";

/** 
 *  ## Input de archivo
 *  Este componente renderiza un input para ingresar un archivo, restringido
 *  por formato.
 *  
 *  - `<tsx />` Se autocierra.
 */ 
const InputFile: React.FC<IACele.UI.Input.FileType> = ({
    id,
    file,
    setFile,
    accept,
    color,
}) => {

    // Inicialización de estado de campo
    const [ fileName, setFileName ] = useState<string>('');
    // Inicialización de estado de error
    const [ hasError, setHasError ] = useState<boolean>(false);

    // Inicialización de referencia de input
    const inputRef = useRef<HTMLInputElement>(null);

    // Función para abrir el explorador de archivos
    const openFileBrowser = () => {
        inputRef.current?.click()
    };

    // Función para validar el tipo de archivo
    const validateType = (name: string) => {

        return (
            Array.from<string, RegExp>(
                accept.split(" "),
                (fileType) => (
                    new RegExp(
                        fileType.replace(/\.(.*)/, '^.*\\.$1')
                    )
                )
            )
            .some(
                (fileType) => ( fileType.test(name) )
            )
        );
    };

    // Función para actualizar el estado de archivo y nombre de archivo
    useEventListener(
        inputRef,
        'change',
        () => {
            // Si existe archivo cargado en el input
            if ( inputRef.current && inputRef.current.files?.length ) {
                // Se obtiene el archivo
                const [ inputFile ] = inputRef.current.files
                // Se establece el nombre del archivo y el archivo en los estados
                setFileName(inputFile.name);
                if ( validateType(inputFile.name) ) {
                    setFile(inputFile);
                    setHasError(false);
                } else {
                    setFile(null);
                    setHasError(true);
                }
            };
        }
    );

    return (
        <div>
            {/* Input oculto */}
            <input ref={inputRef} id={id} type="file" className="hidden" accept={accept} />

            <div className="flex flex-col items-center gap-2 p-2 pr-4 border-2 border-gray-500/50 border-dashed rounded-2xl w-min">

                <div className="flex items-center gap-2 w-full">
                    {/* Botón para subir el archivo */}
                    <Button color={color} onPress={openFileBrowser}>
                        {file ? 'Cambiar archivo' : 'Examinar...'}
                    </Button>

                    {/* Indicador de contenido de input */}
                    <span className={`${!file ? hasError ? 'text-danger-500' : 'text-gray-500' : ''} max-w-72 overflow-hidden text-ellipsis text-nowrap select-none`}>
                        {fileName ? fileName : 'Carga un archivo'}
                    </span>
                </div>

                {/* Mensaje de error */}
                {hasError
                    ? <div className="text-danger-500 text-small">{`Inserta un archivo válido. Las extensiones permitidas son ${accept}`}</div>
                    : null
                }

            </div>
        </div>
    );
};

export default InputFile;
