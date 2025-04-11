import { useContext, useMemo, useState } from "react";
import RecordFormContext from "../../contexts/recordFormContext";
import { tableProperties } from "../../constants/views/names";
import { isKeyboardFieldType, validateValue } from "../../components/views/form/core";
import ERROR_MESSAGE from "../../constants/ui/fieldErrorMessage";

type FormField<K extends IACele.API.Database.TableName> = IACele.View.Form.FieldParams.GenericInput<K> & IACele.View.FieldCommon;

/** 
 *  ## Parámetros de campo de formulario
 *  Este Custom Hook obtiene y computa todos los parámetros necesarios para ser
 *  usados por el compoente {@link Field} en vista de formulario.
 *  
 *  ### Parámetros de entrada
 *  - [ {@link IACele.API.Database.Table keyof RecordInDatabase} ] `name`:
 *  Nombre del valor a renderizar.
 *  - [ `string | undefined` ] `fieldLabel`: Título declarado explíc
 *  itamente para reemplazar el nombre por defecto del campo.
 *  - [ `boolean | undefined` ] `fieldReadonly`: Estado de sólo lectura
 *  declarado explícitamente para reemplazar el estado por defecto del campo
 *  (Si el formulario es de solo lectura, este valor no influirá).
 *  
 *  ### Retorno
 *  Este Custom Hook retorna:
 *  - [ {@link IACele.View.RecordInDatabase RecordInDatabase } ] `record`:
 *  Registro de la base de datos del que se tomarán valores para renderizar un
 *  componente.
 *  - [ `string` ] `label`: Nombre explícito de la columna en caso de querer
 *  reemplazar su nombre prestablecido.
 *  - [ {@link IACele.View.Data.GenericType} GenericType ] `type`: Propiedad
 *  que indica el tipo de dato del valor a renderizar.
 *  - [ `boolean` ] `readonly`: Propiedad que restringe el documento a ser de
 *  solo lectura.
 *  - [ {@link IACele.API.Database.Table keyof RecordInDatabase} ] `name`:
 *  Nombre del campo del cual se extraerá el valor para ser renderizado.
 */ 
const useFormField = <K extends IACele.API.Database.TableName>(
    name: keyof IACele.View.RecordInDatabase<K>,
    fieldLabel: string | undefined,
    fieldReadonly: boolean | undefined,
): FormField<K> => {

    // Obtención de estados desde el contexto
    const { record, readonly: formReadonly, table } = useContext(RecordFormContext) as IACele.Context.FormField<K>;

    // Obtención de las propiedades del campo
    const props = tableProperties[table as K][name];

    // Obtención del nombre del campo
    const computedLabel = (
        fieldLabel
            ? fieldLabel
            : props.name
    );

    // Definición de dominio de readonly
    const computedReadonly = (
        formReadonly === undefined
        ? (
            fieldReadonly !== undefined
                ? fieldReadonly
                : false
        )
        : formReadonly
    );

    // Obtención del tipo de campo
    const computedType = props.type;

    // Obtención de función de validación de valor entrante
    const valueValidation = useMemo(
        () => (
            isKeyboardFieldType(computedType)
                ? validateValue[computedType]
                : ( () => true ) as ( () => (true) )
        ), [computedType]
    );

    // Obtención del mensaje de error en validación de dato entrante en el campo
    const errorMessage = ERROR_MESSAGE[computedType as IACele.View.Data.KeyboardType];

    // Obtención de valor para manejo en formulario y en validación
    const [ value, setValue ] = useState<string | null>(record[name] as string);

    // Obtención de resultado de validación para manejo en formulario
    const isInvalid = useMemo(
        () => {
            if ( value ) return !valueValidation(value);
            return false;
        }, [value, valueValidation]
    );

    return {
        record,
        label: computedLabel,
        type: computedType,
        readonly: computedReadonly,
        name,
        valueValidation,
        errorMessage,
        isInvalid,
        setValue
    };
};

export default useFormField;
