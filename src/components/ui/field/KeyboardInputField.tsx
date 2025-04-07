import { Input } from "@heroui/react";
import { AttachMoneyRounded, PercentRounded } from "@mui/icons-material";
import { fieldToInputType } from "./core";

/** 
 *  ## Campo editable por teclado
 *  Este componente renderiza un campo editable de teclado
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ `string` ] `defaultValue`: Valor inicial del campo
 *  - [ `undefined` ] `valueValidation`: Función para validar la entrada de
 *  datos en el campo.
 *  - [ `string` ] `errorMessage`: Mensaje de error a renderizar si la validación
 *   no pasa.
 *  - [ `boolean` ] `isInvalid`: Estado de si el campo contiene datos inválidos.
 *  - [ {@link React.Dispatch<React.SetStateAction<string | null>>} ]
 *  `setValue`: Manejo de estado para uso en envío de datos en formulario.
 *  - [ {@link KeyboardType} ] `type`: Tipo de dato a renderizar (solo de tipo
 *  de teclado).
 */ 
const KeyboardInputField: React.FC<IACele.Core.UI.Field.KeyboardInput> = ({
    type,
    defaultValue,
    valueValidation,
    errorMessage,
    isInvalid,
    setValue,
}) => {

    // Definición del modo de entrada
    const inputMode = (
        type === 'integer'
            ? 'numeric'
            : type === 'float' || type === 'monetary' || type === 'percentage'
                ? 'decimal'
                : undefined
    );

    // Se crea contenido inicial si el campo es de tipo moneda
    const startContent = (
        type === 'monetary'
            ? <AttachMoneyRounded fontSize="small" />
            : undefined
    );

    // Se crea contenido final si el campo es de tipo porcentaje
    const endContent = (
        type === 'percentage'
            ? <PercentRounded fontSize="small" />
            : undefined
    );

    return (
        <Input
            variant="faded"
            color="primary"
            size="sm"
            type={fieldToInputType[type]}
            defaultValue={defaultValue}
            inputMode={inputMode}
            startContent={startContent}
            endContent={endContent}
            validate={valueValidation}
            errorMessage={errorMessage}
            isInvalid={isInvalid}
            onValueChange={setValue}
        />
    );
};

export default KeyboardInputField;
