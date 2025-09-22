import { useCallback } from "react";

const useComputeLabel = <M extends ModelName>(
    fieldsIndex: Record<IACele.Data.Models.FieldName<M>, IACele.Data.Models.Field<M>>,
    treeConfig: IACele.View.List.Tree.Config<M>[],
) => {

    // Inicialización de función de cómputo de etiqueta de campo
    const computeLabel = useCallback(
        (name: IACele.Data.Models.FieldName<M>) => {
            // Obtención de los datos de configuración de vista
            const config = treeConfig.find( (c) => (c.name === name) ) as IACele.View.List.Tree.Config<M>;

            // Obtención de etiqueta de campo
            const fieldLabel = config.label;
            // Selección de la etiqueta final
            const computedLabel = fieldLabel ?? fieldsIndex[name].label;

            return computedLabel;
        }, [fieldsIndex, treeConfig]
    );

    return { computeLabel };
};

export default useComputeLabel;
