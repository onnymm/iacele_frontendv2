import { Checkbox } from "@heroui/react";
import { isKeyboardFieldType } from "./core";
import useFormField from "../../../hooks/views/useFormField";
import KeyboardInputField from "./KeyboardInputField";

/** 
 *  ## Campo de formulario
 *  Este componente renderiza un campo que muestra el valor de un campo de un
 *  registro de tabla de base de datos.
 *  
 *  ### Parámetros de entrada:
 *  - [ {@link IACele.API.Database.Table keyof RecordInDatabase} ] `name`:
 *  Nombre del campo del cual se extraerá el valor para ser renderizado.
 *  - [ `string` ] `label`: Nombre explícito de la columna en caso de querer
 *  reemplazar su nombre prestablecido.
 *  - [ `boolean` ] `readonly`: Propiedad que restringe el documento a ser de
 *  solo lectura.
 */ 
const Field = <K extends IACele.API.Database.TableName>({
    name,
    label,
    readonly,
}: IACele.View.Form.Field<K>) => {

    // Obtención de estados y funciones de cambio de estado desde hoook
    const { record, label: computedLabel, type: computedType, readonly: computedReadonly, valueValidation, errorMessage, isInvalid, setValue } = useFormField<K>(name, label, readonly);

    return (
        <div className="flex flex-col gap-1 w-full group-[.ui-view-section]:w-min max-w-full overflow-hidden">
            <span className="mt-2 w-full h-4 text-primary-500 text-xs">{computedLabel}</span>
            {
                isKeyboardFieldType(computedType)
                    ? (
                        <KeyboardInputField
                            record={record}
                            name={name}
                            type={computedType}
                            valueValidation={valueValidation}
                            errorMessage={errorMessage}
                            isInvalid={isInvalid}
                            setValue={setValue}
                            readonly={computedReadonly}
                        />
                    )
                    : (
                        computedType === 'boolean'
                            ? (
                                <div className="pt-2">
                                    <Checkbox isSelected={record[name] as boolean} isDisabled={computedReadonly} />
                                </div>
                            )
                            : (
                                <div className="flex flex-row items-center w-full h-8 overflow-x-hidden text-sm text-ellipsis text-nowrap">{(record as IACele.API.DataTypes.GenericRecord)[name]}</div>
                            )
                        
                    )
            }
        </div>
    );
};

export default Field;
