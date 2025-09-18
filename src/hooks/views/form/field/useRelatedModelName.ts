import useFieldMetadata from "../../useFieldMetadata";
import useFieldContext from "./useFieldContext";

const useRelatedModelName = <
    M extends ModelName,
    R extends ModelName,
>() => {

    // Obtención del nombre del campo
    const { name } = useFieldContext<M>();
    // Obtención de los metadatos del campo
    const { fieldMetadata } = useFieldMetadata<M>(name);
    // Obtención del modelo relacionado
    const relatedModelName = fieldMetadata.model as R;

    return { relatedModelName };
};

export default useRelatedModelName;
