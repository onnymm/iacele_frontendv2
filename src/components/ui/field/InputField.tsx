import KeyboardInputField from "./KeyboardInputField";

/** 
 *  ## Campo editable
 *  Este componente renderiza un campo editable ya de tipo teclado o clic.
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
 *  - [ {@link IACele.API.DataTypes.FieldType} ] `type`: Tipo de dato a
 *  renderizar.
 */ 
const InputField: React.FC<IACele.Core.UI.Field.GenericInput> = ({
    type,
    defaultValue,
    valueValidation,
    errorMessage,
    isInvalid,
    setValue,
}) => {

    if (
        type === 'char'
        || type === 'date'
        || type === 'float'
        || type === 'integer'
        || type === 'monetary'
        || type === 'percentage'
    ) {

        return (
            <KeyboardInputField
                type={type}
                defaultValue={defaultValue}
                valueValidation={valueValidation}
                errorMessage={errorMessage}
                isInvalid={isInvalid}
                setValue={setValue}
            />
        );
    };
};

export default InputField;


