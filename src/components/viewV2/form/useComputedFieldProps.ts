import useFormRecordContext from "../hooks/useFormRecordContext";
import useExecuteFormValidation from "../hooks/useExecuteFormValidation";
import useIsInvisible from "../hooks/useIsInvisible";

const useComputedFieldProps = <M extends ModelName>(
    name: IACele.Data.Models.FieldName<M>,
    label: string | undefined,
    readonly: IACele.View.UsingRecord<M, boolean> | undefined,
    invisible: IACele.View.UsingRecord<M, boolean> | undefined,
    decoration: IACele.View.ColorDecoration<M> | undefined,
): IACele.Hook.View.Form.ComputedFieldProps => {

    // Obtención del tipo de dato del campo
    const { ttype } = useFieldTType<M>(name);
    // Obtención de la etiqueta del campo
    const { computedLabel } = useFieldComputedLabel<M>(name, label);
    // Obtención del valor computado de solo lectura
    const { computedReadonly } = useFieldComputedReadonly<M>(name, readonly);
    // Obtención del valor de invisible
    const { computedIsInvisible } = useIsInvisible<M>(invisible);
    // Obtención de color de decoración del campo
    const { computedDecorationColor } = useFieldDecoration<M>(decoration);

    return { ttype, computedLabel, computedReadonly, computedIsInvisible, computedDecorationColor };
};

export default useComputedFieldProps;

const useFieldDecoration = <M extends ModelName>(
    decoration: IACele.View.ColorDecoration<M> | undefined,
): IACele.View.ComputedDecorationColor => {

    // Obtencoón de función de validación de valor de formulario
    const { executeFormValidation } = useExecuteFormValidation<M>();

    // Inicialización de color
    let computedDecorationColor: IACele.UI.HeroUIColor = 'default';
    // Si existen función de decoración...
    if ( decoration !== undefined ) {
        // Evaluación
        if ( decoration.info && executeFormValidation(decoration.info) ) computedDecorationColor = 'secondary';
        if ( decoration.success && executeFormValidation(decoration.success) ) computedDecorationColor = 'success';
        if ( decoration.warning && executeFormValidation(decoration.warning) ) computedDecorationColor = 'warning';
        if ( decoration.danger && executeFormValidation(decoration.danger) ) computedDecorationColor = 'danger';
    };

    return { computedDecorationColor };
};

const useFieldComputedReadonly = <M extends ModelName>(
    name: IACele.Data.Models.FieldName<M>,
    readonly: IACele.View.UsingRecord<M, boolean> | undefined,
): IACele.View.ComputedReadonly => {

    // Obtención de los datos del formulario
    const { readonly: formReadonly, formMode } = useFormRecordContext<M>();
    // Obtención de función para validación de formulario
    const { executeFormValidation } = useExecuteFormValidation<M>();
    // Obtención de los metadatos del campo
    const { fieldMetadata } = useFieldMetadata<M>(name);

    // Inicialización de valor computado de solo lectura
    let computedReadonly;

    // Si el campo es computado...
    if ( fieldMetadata['is_computed'] ) {
        // Se establece el valor predeterminado de solo lectura del campo
        computedReadonly = true;

    // Si el campo está indicado desde la base de datos como solo lectura...
    } else if ( fieldMetadata['readonly'] && formMode === 'read' ) {
        // Se establece el valor predeterminado de solo lectura del campo
        computedReadonly = true;

    // Si el formulario fue especificado como solo lectura...
    } else if ( formReadonly ) {
        // Se establece este valor del formulario
        computedReadonly = true;

    // Si el formulario no fue especificado como solo lectura
    } else {

        // Validación del valor de solo lectura provisto
        computedReadonly = executeFormValidation(readonly);
    };

    return { computedReadonly };
};

const useFieldComputedLabel = <M extends ModelName>(
    name: IACele.Data.Models.FieldName<M>,
    label: string | undefined,
): IACele.View.ComputedLabel => {

    // Obtención de los metadatos del campo
    const { fieldMetadata } = useFieldMetadata<M>(name);

    // Obtención del nombre del campo
    const computedLabel = label ?? fieldMetadata['label'];

    return { computedLabel };
};

const useFieldTType = <M extends ModelName>(
    name: IACele.Data.Models.FieldName<M>,
): IACele.Hook.View.Form.FieldTType => {

    // Obtención de los metadatos del campo
    const { fieldMetadata } = useFieldMetadata(name);

    // Obtención del tipo de dato
    const ttype = fieldMetadata['ttype'];

    return { ttype };
};

const useFieldMetadata = <M extends ModelName>(
    name: IACele.Data.Models.FieldName<M>,
): IACele.Hook.View.Form.FieldMetadata<M> => {

    // Obtención de los metadatos del registro
    const { fieldsMetadata } = useFormRecordContext<M>();

    const fieldMetadata = (
        fieldsMetadata
        .find(
            (atts) => (atts.name === name)
        ) as IACele.Data.Models.Field<M>
    );

    return { fieldMetadata };
};
