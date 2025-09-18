import useFieldMetadata from "./useFieldMetadata";

const useFieldInfo = <M extends ModelName>(
    name: IACele.Data.Models.FieldName<M>,
): IACele.View.Form.FieldInfo => {

    // Obtención de los metadatos del campo
    const { fieldMetadata } = useFieldMetadata<M>(name);
    // Obtención de la información del campo
    const { 'help_info': fieldInfo } = fieldMetadata;

    return { fieldInfo };
};

export default useFieldInfo;
