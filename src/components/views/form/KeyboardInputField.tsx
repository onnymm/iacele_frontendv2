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
 *  - [ `string` ] `errorMessage`: Mensaje de error a renderizar si la
 *  validación no pasa.
 *  - [ `boolean` ] `isInvalid`: Estado de si el campo contiene datos
 *  inválidos.
 *  - [ {@link React.Dispatch<React.SetStateAction> setState} ] `setValue`:
 *  Manejo de estado para uso en envío de datos en formulario.
 *  - [ {@link KeyboardType} ] `type`: Tipo de dato a renderizar (solo de tipo
 *  de teclado).
 *  - [ `function` ] `valueValidation`: Función que valida si el valor
 *  ingresado por el usuario es válido para el campo.
 *  - [ `string` ]: `errorMessage`: Mensaje que indica la razón del error
 *  cuando la función de validación no acepta el valor entrante en el campo.
 *  - [ `boolean` ]: `isInvalid`: Valor que indica el estado del campo.
 *  - [ {@link React.Dispatch<React.SetStateAction> setState} ] `setValue`:
 *  Función de cambio de estado para manejar los cambios del valor ingresado a
 *  un campo de teclado.
 *  - [ `boolean` ] `readonly`: Propiedad que restringe el documento a ser de
 *  solo lectura.
 */ 
const KeyboardInputField = <K extends IACele.API.Database.TableName>({
    record,
    name,
    type,
    valueValidation,
    errorMessage,
    isInvalid,
    setValue,
    readonly,
}: IACele.View.Form.FieldParams.KeyboardInput<K>) => {

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

    if ( !readonly ) {
        return (
            <Input
                variant="faded"
                color="primary"
                size="sm"
                type={fieldToInputType[type]}
                defaultValue={record[name] as string}
                inputMode={inputMode}
                startContent={startContent}
                endContent={endContent}
                validate={valueValidation}
                errorMessage={errorMessage}
                isInvalid={isInvalid}
                onValueChange={setValue}
            />
        );
    } else {
        return (
            <div className="flex flex-row items-center w-full h-8 overflow-x-hidden text-sm text-ellipsis text-nowrap">{record[name] as string}</div>
        );
    };
};

export default KeyboardInputField;
