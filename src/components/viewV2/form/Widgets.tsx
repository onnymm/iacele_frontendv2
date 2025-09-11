import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Autocomplete, AutocompleteItem, Checkbox, Chip, DateInput, NumberInput, Switch, Textarea, TimeInput, TimeInputValue } from "@heroui/react";
import useFormRecordContext from "../hooks/useFormRecordContext";
import CharFieldInput from "../../views/widgets/base/CharFieldInput";
import GenericReadonlyField from "../../views/widgets/base/GenericReadonlyField";
import APIContext from "../../../contexts/apiContext";
import { CalendarDate, CalendarDateTime, parseTime } from "@internationalized/date";
import useFieldContext from "./useFieldContext";
import useRelatedModelName from "../hooks/useRelatedModelName";
import useFieldMetadata from "../../../hooks/views/useFieldMetadata";

export const CharWidget = <M extends ModelName>() => {

    // Obtención de los atributos generados para el widget
    const { readonly, value, decorationColor, onValueChange, placeholder, name } = useWidget<M, 'char' | 'text', string>();

    // Si el campo no es de solo lectura...
    if ( !readonly ) {

        // Se retorna campo editable
        return (
            <CharFieldInput
                name={name}
                value={value}
                decorationColor={decorationColor}
                type="text"
                inputMode="text"
                onValueChange={onValueChange}
                placeholder={placeholder}
            />
        );

    // Si el campo es de solo lectura...
    } else {

        // Se retorna el campo de solo lectura
        return (
            <GenericReadonlyField
                value={value}
                decorationColor={decorationColor}
            />
        );
    };
};

export const IntegerWidget = <M extends ModelName>() => {

    // Obtención de los atributos generados para el widget
    const { readonly, value, decorationColor, onValueChange, placeholder, name, min, max } = useWidget<M, 'integer', number | undefined>();

    // Si el campo no es de solo lectura
    if ( !readonly ) {

        // Se retorna campo editable
        return (
            <NumberInput
                id={name as string}
                aria-label={`${name as string}`}
                variant="faded"
                color={decorationColor === 'default' ? 'primary' : decorationColor}
                size="sm"
                step={1}
                minValue={min}
                maxValue={max}
                value={value}
                onValueChange={onValueChange}
                hideStepper
                placeholder={placeholder}
                classNames={{
                    input: `${decorationColor === 'default' ? 'text-black dark:text-white' : `text-${decorationColor}-500`} focus:text-black dark:focus:text-white placeholder:text-slate-500 placeholder:font-light`,
                    inputWrapper: 'h-8',
                }}
            />
        );

    // Si el campo es de solo lectura...
    } else {

        // Se retorna el campo de solo lectura
        return (
            <GenericReadonlyField
                value={value}
                decorationColor={decorationColor}
            />
        );
    };
};

export const FloatWidget = <M extends ModelName>() => {

    // Obtención de los atributos generados para el widget
    const { readonly, value, decorationColor, onValueChange, placeholder, name, min, max, step } = useWidget<M, 'float', number>();

    // Si el campo no es de solo lectura
    if ( !readonly ) {

        // Se retorna campo editable
        return (
            <NumberInput
                id={name as string}
                aria-label={`${name as string}`}
                variant="faded"
                color={decorationColor === 'default' ? 'primary' : decorationColor}
                size="sm"
                step={step ?? 0.01}
                minValue={min}
                maxValue={max}
                value={value}
                onValueChange={onValueChange}
                hideStepper
                placeholder={placeholder}
                classNames={{
                    input: `${decorationColor === 'default' ? 'text-black dark:text-white' : `text-${decorationColor}-500`} focus:text-black dark:focus:text-white placeholder:text-slate-500 placeholder:font-light`,
                    inputWrapper: 'h-8',
                }}
            />
        );

    // Si el campo es de solo lectura...
    } else {

        // Se retorna el campo de solo lectura
        return (
            <GenericReadonlyField
                value={value}
                decorationColor={decorationColor}
            />
        );
    };
};

export const CheckWidget = <M extends ModelName>() => {

    // Obtención de los atributos generados para el widget
    const { readonly, value, decorationColor, onValueChange, name } = useWidget<M, 'boolean', boolean>();

    return (
        <Checkbox
            id={name as string}
            color={decorationColor === 'default' ? 'primary' : decorationColor}
            onValueChange={onValueChange}
            isSelected={Boolean(value)}
            isDisabled={readonly}
        />
    );
};

export const SwitchWidget = <M extends ModelName>() => {

    // Obtención de los atributos generados para el widget
    const { readonly, value, decorationColor, onValueChange, name } = useWidget<M, 'boolean', boolean>();

    return (
        <Switch
            id={name as string}
            color={decorationColor === 'default' ? 'primary' : decorationColor}
            onValueChange={onValueChange}
            isSelected={Boolean(value)}
            isDisabled={readonly}
            size="sm"
            classNames={{
                wrapper: 'h-5',
                thumb: 'size-4'
            }}
        />
    );
};

export const TextWidget = <M extends ModelName>() => {

    // Obtención de los atributos generados para el widget
    const { readonly, value, decorationColor, onValueChange, name } = useWidget<M, 'text', (string | undefined)>();

    // Si el campo no es solo lectura...
    if ( !readonly ) {

        // Se retorna el campo editable
        return (
            <Textarea
                id={name as string}
                variant="faded"
                color={decorationColor === 'default' ? 'primary' : decorationColor}
                size="sm"
                value={value ?? ''}
                disableAutosize
                onValueChange={onValueChange}
                classNames={{
                    input: `${decorationColor === 'default' ? 'text-black dark:text-white' : `text-${decorationColor}-500`} p-2 focus:text-black dark:focus:text-white placeholder:text-slate-500 placeholder:font-light`,
                    inputWrapper: 'p-0 pb-2 pt-1 w-full',
                    base: 'h-28',
                }}
            />
        );

    // Si el campo es solo lectura...
    } else {
        // Se retorna el campo de solo lectura
        return (
            <div className={`${decorationColor} overflow-y-auto flex flex-row items-center w-full h-20 mb-3 overflow-x-hidden text-sm text-ellipsis text-nowrap`}>
                {value as string}
            </div>
        );
    };
};

export const SelectionWidget = <M extends ModelName>() => {

    // Obtención de los atributos generados para el widget
    const { readonly, value, decorationColor, onValueChange, name } = useWidget<M, 'selection', (string | undefined)>();
    // Obtención de los metadatos del campo
    const { fieldMetadata } = useFieldMetadata<M>(name);

    // Si el campono es de solo lectura...
    if ( !readonly ) {

        // Se retorna el componente de selección de opciones
        return (
            <Autocomplete
                aria-label={name as string}
                selectedKey={value}
                variant="faded"
                color={decorationColor === 'default' ? 'primary' : decorationColor}
                size="sm"
                onSelectionChange={onValueChange as never}
            >
                {fieldMetadata.selection_ids.map(
                    (option) => (
                        <AutocompleteItem key={option.name}>{option.label}</AutocompleteItem>
                    )
                )}
            </Autocomplete>
        );

    // Si el campo es de solo lectura
    } else {

        const valueLabel = (
            fieldMetadata.selection_ids
            .find(
                (option) => (option.name === value)
            )
            ?.label ?? ''
        )

        // Se retorna el campo de solo lectura
        return (
            <GenericReadonlyField
                value={valueLabel}
                decorationColor={decorationColor}
            />
        );
    };
};

export const Many2OneWidget = <M extends ModelName>() => {

    // Obtención de los atributos generados para el widget
    const { readonly, decorationColor, name } = useWidget<M, 'selection', (string | undefined)>();
    // Obtención de valores y funciones para opciones Many2One
    const { initialSelectedOption, selectedKey, setSelectedKey, search, options, setSearch, setIsOpen } = useMany2OneOptions<M>();

    // Creación de la función de cambio de estado de valor de formulario
    const { onValueChange } = useOnValueChange<M, 'char' | 'integer', IACeleV2.Data.Models.TType.Many2One>(
        (seletedValue) => {
            // Se establece la llave seleccionada
            setSelectedKey(seletedValue as string);
            // Se obtienen los valores de la opción seleecionada
            const selectedOption = options.find( (option) => (option.key === seletedValue) );
            // Obtención del valor
            const processedValue = (
                // Si existe una opción seleccionada...
                selectedOption
                    // Se usa su ID y su nombre para establecerse como valor del formulario
                    ? [Number(selectedOption.key), selectedOption.label]
                    // Se usa el valor nulo para usarse en la escritura del backend
                    : null
            );

            return processedValue as IACeleV2.Data.Models.TType.Many2One;
        }
    );

    // Si el campo no es de solo lectura...
    if ( !readonly ) {
        // Se retorna el componente de selección de opciones Many2One
        return (
            <Autocomplete
                aria-label={name as string}
                value={search}
                selectedKey={String(selectedKey)}
                variant="faded"
                color={decorationColor === 'default' ? 'primary' : decorationColor}
                size="sm"
                onOpenChange={setIsOpen}
                onSelectionChange={onValueChange as never}
                onValueChange={setSearch}
            >
                {options.map(
                    (option) => (
                        <AutocompleteItem key={option.key}>{option.label}</AutocompleteItem>
                    )
                )}
            </Autocomplete>
        );

    // Si el campo es de solo lectura...
    } else {

        const valueLabel = (
            initialSelectedOption
                ? initialSelectedOption.label
                : ''
        );

        // Se retorna el campo de solo lectura
        return (
            <GenericReadonlyField
                value={valueLabel}
                decorationColor={decorationColor}
            />
        );
    }
};

export const DurationWidget = <K extends ModelName>() => {

    // Obtención de los atributos generados para el widget
    const { readonly, decorationColor, name, value } = useWidget<K, 'text', (string | undefined)>();
    // Obtención de valores y funciones para uso del campo
    const { hours, setHours, minutes, setMinutes, seconds, setSeconds } = useDurationValue<K>();


    // Si el campo no es de solo lectura...
    if ( !readonly ) {
        // Se retorna el componente para manipular el valor
        return (
            <div className="gap-1 grid grid-cols-3 group-[.ui-table]:w-60">
                <div className="flex gap-1">
                    <TimeFragmentField name={name} decorationColor={decorationColor} fragment="hours" value={hours} onValueChange={setHours} />
                    :
                </div>
                <div className="flex gap-1">
                    <TimeFragmentField name={name} decorationColor={decorationColor} fragment="minutes" value={minutes} onValueChange={setMinutes} />
                    :
                </div>
                <div className="flex gap-1">
                    <TimeFragmentField name={name} decorationColor={decorationColor} fragment="seconds" value={seconds} onValueChange={setSeconds} />
                </div>
            </div>
        );

    // Si el componente es de solo lectura...
    } else {

        // Se retorna el campo de solo lectura
        return (
            <GenericReadonlyField
                value={value}
                decorationColor={decorationColor}
            />
        );
    };
};

export const DatetimeWidget = <K extends ModelName>() => {

    // Obtención de los atributos generados para el widget
    const { readonly, decorationColor, name } = useWidget<K, 'text', (string | undefined)>();
    // Obtención de valores desde el contexto del formulario
    const { setFormRecordField } = useFormRecordContext<K>();
    // Obtención de valores para uso en campo
    const { value, displayTextDate } = useDatetime<K>();

    // Inicialización de función de actualización de valor de fechatiempo
    const onValueChange = useCallback(
        (value: CalendarDateTime | null) => {
            const parsedValue = value?.toString().replace('T', ' ');
            setFormRecordField(name, parsedValue as never);
        }, [name, setFormRecordField]
    );

    // Si el campo no es de solo lectura...
    if ( !readonly ) {
        // Se retorna el componente de manipulación de valor
        return (
            <DateInput
                aria-label={`${name as string}`}
                granularity="second"
                variant="faded"
                color={decorationColor === 'default' ? 'primary' : decorationColor}
                size="sm"
                value={value as never}
                onChange={onValueChange}
                hourCycle={12}
            />
        );

    // Si el campo es de solo lectura...
    } else {
        // Se retorna la vista del valor del campo
        return (
            <div className="flex flex-row items-center w-full h-8 overflow-x-hidden text-sm text-ellipsis text-nowrap">
                {displayTextDate(value)}
            </div>
        );
    };
};

export const TimeWidget = <K extends ModelName>() => {

    // Obtención de los atributos generados para el widget
    const { readonly, decorationColor, name } = useWidget<K, 'text', (string | undefined)>();
    // Obtención de valores desde el contexto del formulario
    const { setFormRecordField } = useFormRecordContext<K>();

    const { value, displayTextTime } = useTime<K>();
    const onValueChange = useCallback(
        (inputValue: TimeInputValue) => {
            const parsedValue = (
                inputValue
                    ? inputValue.toString()
                    : ''
            );
            setFormRecordField(name, parsedValue as never);
        }, [name, setFormRecordField]
    );

    // Si el campo no es de solo lectura...
    if ( !readonly ) {

        // Se retorna el componente de manipulación de valor
        return (
            <TimeInput
                aria-label={name as string}
                variant="faded"
                size="sm"
                value={value}
                color={decorationColor === 'default' ? 'primary' : decorationColor}
                onChange={onValueChange as never}
            />
        );

    // Si el campo es de solo lectura...
    } else {
        // Se retorna la vista del valor del campo
        return (
            <div className="flex flex-row items-center w-full h-8 overflow-x-hidden text-sm text-ellipsis text-nowrap">
                {displayTextTime()}
            </div>
        );
    };
};

export const DateWidget = <K extends ModelName>() => {

    // Obtención de los atributos generados para el widget
    const { readonly, decorationColor, name } = useWidget<K, 'text', (string | undefined)>();
    // Obtención de valores desde el contexto del formulario
    const { setFormRecordField } = useFormRecordContext<K>();
    // Obtención de valores para uso en campo
    const { value, displayTextDate } = useDate<K>();

    const onValueChange = useCallback(
        (inputValue: CalendarDate | null) => {
            const parsedValue = inputValue?.toString()
            setFormRecordField(name, parsedValue as never)
        }, [name, setFormRecordField]
    );

    // Si el campo no es de solo lectura...
    if ( !readonly ) {
        // Se retorna el componente de manipulación de valor
        return (
            <DateInput
                aria-label={name as string}
                variant="faded"
                color={decorationColor === 'default' ? 'primary' : decorationColor}
                size="sm"
                value={value as never}
                onChange={onValueChange}
            />
        );

    // Si el campo es de solo lectura...
    } else {

        // Se retorna la vista del valor de campo
        return (
            <div className="flex flex-row items-center w-full h-8 overflow-x-hidden text-sm text-ellipsis text-nowrap">
                {displayTextDate()}
            </div>
        );
    };
};

export const One2ManyTagsWidget = <K extends ModelName>() => {

    // Obtención de los atributos generados para el widget
    const { decorationColor, value } = useWidget<K, 'one2many', (string | undefined)>();

    // Si no existen valores a mostrar, se termina la ejecución
    if ( value === null || value === undefined ) return null;

    return (
        <div className="flex flex-wrap gap-1">
            {value.map(
                (item, key) => (
                    <Chip
                        color={decorationColor}
                        size="sm"
                        key={key}
                    >
                        {item.name}
                    </Chip>
                )
            )}
        </div>
    );
};

// ----------------------------------------------------------------------------

const TimeFragmentField = <M extends ModelName>({
    name,
    fragment,
    value,
    onValueChange,
    decorationColor,
}: TimeFragmentFieldParams<M>) => {

    return (
        <NumberInput
            aria-label={`${name as string}-${fragment}`}
            value={value}
            onValueChange={onValueChange}
            variant="faded"
            color={decorationColor === 'default' ? 'primary' : decorationColor}
            size="sm"
            classNames={{ inputWrapper: 'h-8 w-fit' }}
            formatOptions={{ minimumIntegerDigits: 2 }}
            minValue={0}
            maxValue={fragment !== 'hours' ? 59 : 9999}
        />
    );
};

const useDate = <K extends ModelName>() => {

    // Obtención de los datos del registro
    const { formRecord } = useFormRecordContext<K>();
    // Obtención del nombre del campo
    const { name } = useFieldContext<K>();

    // Función para actualizar el valor cada que éste cambia
    const updateValue = useCallback(
        () => {

            // Inicialización del valor tomando el dato desde el formulario
            const value = formRecord[name] as IACeleV2.Data.Models.TType.Date;
            // Si el valor es nulo se retorna éste
            if ( value === null || value === undefined ) return value;

            // Obtención de los valores para crear el objeto de fecha
            const [ year, month, day ] = (
                value
                .split('-')
                .map( (v)=> (Number(v)) )
            );
            // Creación del objeto de fecha
            const parsedValue = new CalendarDate(year, month, day);

            return parsedValue;
        }, [formRecord, name]
    );

    // Inicialización del estado del valor del campo
    const [ value, setValue ] = useState<CalendarDate | null>(updateValue);

    // Actualización del valor
    useEffect(
        () => {
            setValue( updateValue() );
        }, [updateValue]
    );

    // Inicialización de función para mostrar el valor en texto
    const displayTextDate = useCallback(
        () => {

            // Si el valor es nulo se retorna la nulidad
            if ( value ===  null ) return null;

            // Obtención del año, mes y día
            const [ year, month, day ] = value.toString().split('-');

            // Construcción del valor parseado
            const parsedValue = `${day} / ${month} / ${year}`;

            return parsedValue;
        }, [value]
    )

    return { value, displayTextDate };
};

const useTime = <K extends ModelName>() => {

    // Obtención de los datos del registro
    const { formRecord } = useFormRecordContext<K>();
    // Obtención del nombre del campo
    const { name } = useFieldContext<K>();

    // Inicialización del valor
    const value = (
        formRecord[name]
            ? parseTime(formRecord[name] as string)
            : null
    );

    // Inicializaición de función para mostrar el valor como texto
    const displayTextTime = useCallback(
        () => {

            // Si el valor es nulo se retorna la nulidad
            if ( value === null ) return null;

            // Obtención de valores de hora, minuto y segundo
            const [ hh, mm, ss ] = value.toString().split(':')
            // Formateo de 12 horas
            const [ formattedHours, meridiem ] = (
                Number(hh) > 12
                    ? [ ( Number(hh) - 12 ).toString().padStart(2, "0"), 'p.m.' ]
                    : [ Number(hh).toString().padStart(2, "0"), 'a.m.' ]
            );
            // Construcción de valor parseado
            const parsedValue = `${formattedHours} : ${mm} : ${ss} ${meridiem}`;

            return parsedValue;
        }, [value]
    );

    return { value, displayTextTime };
};

const useDatetime = <K extends ModelName>() => {

    // Obtención de los datos del registro
    const { formRecord } = useFormRecordContext<K>();
    // Obtención del nombre del campo
    const { name } = useFieldContext<K>();

    // Función para actualizar el valor cada que éste cambia
    const updateValue = useCallback(
        () => {

            // Inicialización del valor tomando el dato desde el formulario
            let value = formRecord[name] as IACeleV2.Data.Models.TType.Datetime;
            // Si el valor es nulo se retorna éste
            if ( value === null || value === undefined ) return value;

            // Se corta el remanente después de los segundos
            [ value, ] = value.split('.');
            // Se obtiene la fecha
            const [ date, time ] = value.split(' ')
            // Obtención de los valores para crear el objeto de fechatiempo
            const [ year, month, day, hour, minute, second ] = (
                [
                    ...date.split('-'),
                    ...time.split(':'),
                ]
                .map( (v) => (Number(v)) )
            );
            // Creación del objeto fechatiempo
            const parsedValue = new CalendarDateTime(year, month, day, hour, minute, second);

            return parsedValue;
        }, [formRecord, name]
    );

    // Inicialización del estado del valor del campo
    const [ value, setValue ] = useState<CalendarDateTime | null>(updateValue);

    // Actualización del valor
    useEffect(
        () => {
            setValue( updateValue() );
        }, [updateValue]
    );

    // Inicialización de función para mostrar valor como texto
    const displayTextDate = (value: CalendarDateTime | null) => {

        // Si el valor es nulo se retorna la nulidad
        if ( value === null ) return null;

        // Destructuración de los valores
        const [ date, time ] = value.toString().split('T');
        const [ year, month, day ] = date.split('-')
        const [ hours, minutes, seconds ] = time.split(':')

        // Formateo de 12 horas
        const [ formattedHours, meridiem ] = (
            Number(hours) > 12
                ? [ ( Number(hours) - 12 ).toString().padStart(2, "0"), 'p.m.' ]
                : [ Number(hours).toString().padStart(2, "0"), 'a.m.' ]
        );

        // Contrucción del valor formateado
        const formattedValue = `${day} / ${month} / ${year}, ${formattedHours} : ${minutes} : ${seconds} ${meridiem}`;

        return formattedValue;
    };

    return { value, displayTextDate };
};

const useDurationValue = <M extends ModelName>() => {

    // Obtención de los datos del registro
    const { formRecord, setFormRecordField } = useFormRecordContext<M>();
    // Obtención del nombre del campo
    const { name } = useFieldContext<M>();

    // Inicialización de valor de cómputo de valores desde valor de texto
    const computeValues = useCallback<() => [number, number, number]>(
        () => {

            // Inicialización de valor
            const value = formRecord[name] as IACeleV2.Data.Models.TType.Duration;
            // Si el valor no es nulo ni indefinido...
            if ( value !== null && value !== undefined ) {
                // Destructuración de valores de hora, minuto y segundo
                const [ hh, mm, ss ] = (
                    value
                    // Separación por símbolo de dos puntos
                    .split(':')
                    // Mapeo a números
                    .map( (v) => (Number(v)) )
                );

                return [ hh, mm, ss ];

            // Si el valor es nulo o indefinido
            } else {
                // Se retorna un arreglo en ceros.
                return [0, 0, 0];
            };
        }, [formRecord, name]
    );

    // Inicialización de estado de duración
    const [ duration, setDuration ] = useState<[number, number, number]>(computeValues());

    // Efecto de actualización de valor
    useEffect(
        () => {
            setDuration(computeValues());
        }, [computeValues]
    );

    // Inicialización de función para actualizar valor
    const updateValue = useCallback(
        (updatedDuration: [number, number, number]) => {

            // Formateo de valor a formateo de 12 horas
            const [ hh, mm, ss ] = (
                updatedDuration
                .map(
                    (value) => {
                        if ( value < 9 ) {
                            return `0${value}`;
                        } else {
                            return `${value}`;
                        }
                    }
                )
            );

            // Construcción de valor formateado en texto
            const formattedValue = `${hh}:${mm}:${ss}`;
            // Actualización de valor en los datos del formulario
            setFormRecordField(name, formattedValue as never);
        }, [setFormRecordField, name]
    );

    // Inicialización de estados de duración
    const [ hours, minutes, seconds ] = useMemo(
        () => (duration), [duration]
    );

    const updateFragment = useCallback(
        (index: 0 | 1 | 2) => {

            // Construcción de función de actualización de fragmento
            return (
                (value: number) => {
                    // Creación de copia de valor
                    const durationCopy = [ ...duration ] as [number, number, number];
                    // Se actualiza el valor en el índice indicado
                    durationCopy[index] = Number.isNaN(value) ? 0 : value;
                    // Se establece el valor de duración
                    setDuration(durationCopy);
                    // Se actualiza el valor
                    updateValue(durationCopy);
                }
            );
        }, [duration, updateValue]
    );

    // Inicialización de funciones de cambio actualización de valores
    const setHours = updateFragment(0);
    const setMinutes = updateFragment(1);
    const setSeconds = updateFragment(2);

    return {
        hours,
        minutes,
        seconds,
        setHours,
        setMinutes,
        setSeconds,
    };
};

const useMany2OneOptions = <M extends ModelName>() => {

    // Obtención de la instancia de API desde el contexto
    const { api } = useContext(APIContext);
    // Obtención del modelo relacionado
    const { relatedModelName } = useRelatedModelName<M>();
    // Obtención del dominio
    const { domain } = useFieldContext<M>();
    // Obtención de estados y funciones de llave seleccionada
    const { initialSelectedOption, selectedKey, setSelectedKey, isInitialKeySelected } = useSelectedMany2OneOption<M>();
    // Inicialización de opciones
    const [ options, setOptions ] = useState<Option[]>(
        () => {
            if ( initialSelectedOption ) {
                return [ initialSelectedOption ]
            } else {
                return [];
            };
        }
    );

    // Inicialización de objeto de registros de la API
    const [ recordsFromAPI, setRecordsFromAPI ] = useState<Option[]>([]);
    // Memoización del dominio establecido en el campo para evitar renderizaciones innecesarias
    const [ memoizedDomain ] = useState<IACeleV2.Data.Models.CriteriaStructure<M>>(domain as IACeleV2.Data.Models.CriteriaStructure<M>);
    // Inicialización del valor de búsqueda
    const [ search, setSearch ] = useState<string>('');
    // Incialización de apertura de componente
    const [ isOpen, setIsOpen ] = useState<boolean>(false);

    // Función para obtener registros de la API
    const getRecords = useCallback(
        async () => {

            // Obtención de registros para ser mostrados como opciones en el compónente
            const records = await api.form.getFieldRelatedRecords(relatedModelName, memoizedDomain, search);
            // Conversión de los registros a formato de opciones
            const processedRecords: Option[] = records.map(
                (record) => ({
                    key: String(record.id),
                    label: record.name,
                })
            );
            // Se usan los registros procesador para establecerse como valor
            setRecordsFromAPI(processedRecords);
        }, [api, relatedModelName, memoizedDomain, search]
    );

    // Uso de efecto para garantizar que la opción seleccionada aparezca en las opciones disponibles
    useEffect(
        () => {

            // Se genera una copia de las opciones (registros desde la API) a ser establecidas en el estado
            const optionsToSet: Option[] = [ ...recordsFromAPI ];

            // La llave seleccionada no es nula
            const selectedKeyNotNull = selectedKey !== null;
            // La opción inicial no es nula
            const initialSelectedOptionNotNull = initialSelectedOption !== null;

            // Si los tres criterios se cumplen...
            if ( selectedKeyNotNull && initialSelectedOptionNotNull && isInitialKeySelected ) {

                // Búsqueda de la opción seleccionada dentro de los registros de la API
                const found = optionsToSet.find( (option) => (option.key === String(selectedKey)) );
                // Si la opción seleccionada no existe...
                if ( found === undefined ) {
                    // Se usan los datos de la opción inicial
                    optionsToSet.push( initialSelectedOption );
                };
            };

            // Se establecen las opciones procesadas como valor de las opciones
            setOptions(optionsToSet);
        }, [initialSelectedOption, isInitialKeySelected, recordsFromAPI, selectedKey]
    );

    // Disparo de la solicitud de datos al backend cuando el componente se despliega
    useEffect(
        () => {
            // Si el componente no está abierto se termina la ejecución
            if ( !isOpen ) return;
            // Se obtienen registros de la API
            getRecords();
        }, [isOpen, getRecords]
    );

    return { initialSelectedOption, selectedKey, setSelectedKey, search, options, setSearch, setIsOpen };
};

const useSelectedMany2OneOption = <K extends ModelName>() => {

    // Obtención de los datos del registro
    const { formRecord } = useFormRecordContext<K>();
    // Obtención de los atributos del campo
    const { name } = useFieldContext<K>();

    // Inicialización de la opción seleccionada
    const initialSelectedOption: Option | null = useMemo(
        () => {
            // Obtención del valor del campo
            const value = formRecord[name] as IACeleV2.Data.Models.TType.Many2One;
            // Si existe un valor...
            if ( value ) {
                // Destructuración de llave y etiqueta
                const [ key, label ] = value;

                return { key: String(key), label };

            // Si no existe un valor...
            } else {

                // Se retorna null
                return null
            };
        }, [formRecord, name]
    );

    // Inicialización de función de actualización de valor de selección
    const updateSelectedKey = useCallback(
        () => {

            // Si existe un valor de selección...
            if ( initialSelectedOption ) {
                // Se usa la ID de éste para mapear la etiqueta a mostrar
                return initialSelectedOption.key;

            // Si no existe un valor de selección
            } else {
                // Se usa el valor de nulidad
                return null;
            };
        }, [initialSelectedOption]
    );

    // Inicialización de la llave seleccionada
    const [ selectedKey, setSelectedKey ] = useState<string | null>( updateSelectedKey() )

    // Actualización de valor
    useEffect(
        () => {
            setSelectedKey( updateSelectedKey() );
        }, [updateSelectedKey]
    );

    // Función de actualización de si la llave inicial está seleccionada
    const updateIsInitialKeySelected = useCallback(
        () => {
            return (
                selectedKey !== undefined
                && initialSelectedOption !== undefined
                && initialSelectedOption !== null
                && selectedKey === initialSelectedOption.key
            );
        }, [initialSelectedOption, selectedKey]
    );

    // Inicialización de indicador de si la llave inicial está seleccionada
    const [ isInitialKeySelected, setIsInitialKeySelected ] = useState<boolean>( updateIsInitialKeySelected() );

    // Actualización de valor de si la llave inicial está seleccionada
    useEffect(
        () => {
            setIsInitialKeySelected( updateIsInitialKeySelected() );
        }, [updateIsInitialKeySelected]
    );

    return { initialSelectedOption, selectedKey, setSelectedKey, isInitialKeySelected };
};

const useWidget = <
    M extends ModelName,
    T extends keyof IACeleV2.Deprecated.TTypeMap<M>,
    O,
>(): IACeleV2.Deprecated.DataWidget<M, T> => {

    // Obtención de valores desde el contexto del campo
    const { computedDecorationColor, computedReadonly, domain, name, ttype, placeholder } = useFieldContext<M>();
    // Obtención de valores desde el contexto del formulario
    const { formRecord } = useFormRecordContext<M>();
    // Obtención de las 
    const { parseCallbacks } = useParseMap<M>();
    // Creación de la función de cambio de valor
    const { onValueChange } = useOnValueChange<M, T, O>(parseCallbacks[ttype as keyof ParseMap<M>] as never);
    // Obtención del valor del campo
    const value = formRecord[name] as unknown as IACeleV2.Deprecated.SupportedType<M, T>;
    // Creación de las propiedades del widget
    const widgetProps: IACeleV2.Deprecated.DataWidget<M, T> = {
        name,
        recordData: formRecord,
        value,
        onValueChange,
        readonly: computedReadonly,
        decorationColor: computedDecorationColor,
        placeholder: placeholder,
        domain: domain,
    };

    return { ...widgetProps };
};

const useParseMap = <M extends ModelName>() => {

    const parseCallbacks: ParseMap<M> = {
        'char': (value) => {
            return (
                value === null
                    ? undefined
                    : value
            );
        },
        'integer': (value) => (value),
        'float': (value) => (value),
        'boolean': (value) => (Boolean(value)),
        'text': (value) => {
            return (
                value === null
                    ? undefined
                    : value
            );
        },
        'selection': (value) => (value),
        'many2one': (value) => (value),
        'duration': (value) => (value),
        'datetime': (value) => (value),
        'date': (value) => (value),
        'time': (value) => (value),
        'one2many': (value) => (value),
    };

    return { parseCallbacks };
};

const useOnValueChange = <M extends ModelName, T extends keyof IACeleV2.Deprecated.TTypeMap<M>, O>(
    parseValue: ParseFunction<M, T, O>,
) => {

    // Obtención de los datos del registro
    const { setFormRecordField } = useFormRecordContext<M>();
    // Obtención del nombre del campo
    const { name } = useFieldContext<M>();

    // Inicialización de la función para cambio de valor
    const onValueChange = useCallback(
        (value: IACeleV2.Deprecated.SupportedType<M, T>) => {

            // Parseo del valor
            const parsedValue = parseValue(value);

            // Se establece el valor del campo
            setFormRecordField(
                name,
                parsedValue as never,
            );
        }, [parseValue, setFormRecordField, name]
    );

    return { onValueChange };
};

interface TimeFragmentFieldParams <K extends ModelName>{
    name: IACeleV2.Data.Models.FieldName<K>;
    fragment: 'hours' | 'minutes' | 'seconds';
    value: number;
    onValueChange: (value: number) => void;
    decorationColor: IACeleV2.UI.HeroUIColor;
};

interface Option {
    key: string,
    label: string,
};

type ParseFunction<K extends ModelName, T extends keyof IACeleV2.Deprecated.TTypeMap<K>, O> = (value: IACeleV2.Deprecated.SupportedType<K, T>) => O;

interface ParseMap<K extends ModelName>{
    'char': ParseFunction<K, 'char', (string | undefined)>;
    'integer': ParseFunction<K, 'integer', number>;
    'float': ParseFunction<K, 'float', number>;
    'boolean': ParseFunction<K, 'boolean', boolean>;
    'text': ParseFunction<K, 'text', (string | undefined)>;
    'selection': ParseFunction<K, 'selection', (string | null)>;
    'many2one': ParseFunction<K, 'char', (string)>;
    'duration': ParseFunction<K, 'char', string>;
    'datetime': ParseFunction<K, 'char', string>;
    'date': ParseFunction<K, 'char', string>;
    'time': ParseFunction<K, 'char', string>;
    'one2many': ParseFunction<K, 'char', string>;
};
