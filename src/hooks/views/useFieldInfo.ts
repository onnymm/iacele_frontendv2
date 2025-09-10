import useFieldMetadata from "./useFieldMetadata";

const useFieldInfo = <M extends ModelName>(
    name: IACeleV2.Data.Models.FieldName<M>,
): IACeleV2.View.Form.FieldInfo => {

    // Obtención de los metadatos del campo
    const { fieldMetadata } = useFieldMetadata<M>(name);
    // Obtención de la información del campo
    const { 'help_info': fieldInfo } = fieldMetadata;

    return { fieldInfo };
};

export default useFieldInfo;
