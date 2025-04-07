import { useContext, useMemo, useState } from "react";
import RecordFormContext from "../../contexts/recordFormContext";
import { isKeyboardFieldType, validateValue } from "../../components/ui/field/core";
import ERROR_MESSAGE from "../../constants/ui/fieldErrorMessage";
import { table } from "../../constants/views/names";

interface FieldContextParams <T extends IACele.API.Database.TableName>{
    record: IACele.API.Database.Table[T];
    formReadonly?: boolean;
    tableName: T;
};

/** 
 *  ## Parámetros de campo de formulario
 *  Este Custom Hook obtiene y computa todos los parámetros necesarios para ser
 *  usados por el compoente {@link Field} en vista de formulario.
 *  
 *  ### Parámetros de entrada
 *  - [ {@link keyof IACele.API.Database.Table} ] `name`: Nombre del valor a
 *  renderizar.
 *  - [ {@link string | undefined} ] `fieldLabel`: Título declarado explíc
 *  itamente para reemplazar el nombre por defecto del campo.
 *  - [ {@link boolean | undefined} ] `fieldReadonly`: Estado de sólo lectura
 *  declarado explícitamente para reemplazar el estado por defecto del campo
 *  (Si el formulario es de solo lectura, este valor no influirá).
 *  
 *  ### Retorno
 *  Este Custom Hook retorna:
 *  - [ {@link IACele.API.Database.Table} ] `record`: Información del
 *  registro a renderizar en la vista de formulario.
 *  - [ `string` ] `computedLabel`: Título computado del campo a renderizar.
 *  - [ {@link IACele.Core.UI.Field.GenericType} ] `computedType`: Tipo de dato
 *  computado para el campo a renderizar.
 *  - [ {@link boolean | undefined} ] `computedRedonly`: Estado de solo de
 *  lectura computado para el campo a renderizar.
 *  - [ `undefined` ] `valueValidation`: Función para validar la entrada de
 *  datos en el campo.
 *  - [ `string` ] `errorMessage`: Mensaje de error a renderizar si la validación
 *   no pasa.
 *  - [ `boolean` ] `isInvalid`: Estado de si el campo contiene datos inválidos
 *  - [ {@link React.Dispatch<React.SetStateAction<string | null>>} ]
 *  `setValue`: Manejo de estado para uso en envío de datos en formulario.
 */ 
const useField = <T extends IACele.API.Database.TableName>(
    name: keyof IACele.API.Database.Table[T], // Nombre del valor a renderizar.
    fieldLabel: string | undefined, // Título declarado explícitamente para reemplazar el nombre por defecto del campo.
    fieldReadonly: boolean | undefined, // Estado de sólo lectura declarado explícitamente para reemplazar el estado por defecto del campo (Si el formulario es de solo lectura, este valor no influirá).
) => {

    // Obtención de estados desde el contexto
    const { record, formReadonly, tableName } = useContext(RecordFormContext) as FieldContextParams<T>;

    // Obtención de las propiedades del campo
    const props = table[tableName][name];

    // Obtención del nombre del campo
    const computedLabel = (
        fieldLabel
            ? fieldLabel
            : props.name
    );

    // Obtención del tipo de campo
    const computedType = props.type;

    // Definición de dominio de readonly
    const computedRedonly = (
        formReadonly === undefined
            ? fieldReadonly
            : formReadonly
    );

    const valueValidation = useMemo(
        () => (
            isKeyboardFieldType(computedType)
                ? validateValue[computedType]
                : ( () => true) as (() => (true) )
        ), [computedType]
    );

    // Obtención del mensaje de error en validación de dato entrante en el campo
    const errorMessage: string | undefined = ERROR_MESSAGE[computedType as IACele.Core.UI.Field.KeyboardType] as string;

    // Obtención de valor para manejo en formulario y en validación
    const [ value, setValue ] = useState<string | null>((record as IACele.API.DataTypes.GenericRecord)[name] as string)

    // Obtención de resultado de validación para manejo en formulario
    const isInvalid = useMemo(
        () => {
            if ( value ) return !valueValidation(value);
            return false;
        }, [value, valueValidation]
    )

    return { record, computedLabel, computedType, computedRedonly, valueValidation, errorMessage, isInvalid, setValue };
};

export default useField;
