import useExecuteTreeValidation from "./useExecuteTreeValidation";

const useComputeFieldDecoration = <M extends ModelName>(
    treeRecordsIndex: Record<number, IACele.Data.Models.Record<M>>,
) => {

    // Obtención de función de validación de valor de formulario
    const { executeTreeValidation } = useExecuteTreeValidation<M>(treeRecordsIndex);

    const executeValidation = (
        config: IACele.View.List.Tree.Config<M>,
        id: number,
    ) => {

        // Inicialización de color
        let computedDecorationColor: IACele.UI.HeroUIColor = 'default';
        const { decoration } = config;

        // Si existen función de decoración...
        if ( decoration !== undefined ) {
            // Evaluación
            if ( decoration.info && executeTreeValidation(id, decoration.info) ) computedDecorationColor = 'secondary';
            if ( decoration.success && executeTreeValidation(id, decoration.success) ) computedDecorationColor = 'success';
            if ( decoration.warning && executeTreeValidation(id, decoration.warning) ) computedDecorationColor = 'warning';
            if ( decoration.danger && executeTreeValidation(id, decoration.danger) ) computedDecorationColor = 'danger';
        };

        return { computedDecorationColor };
    };

    return { executeValidation };
};

export default useComputeFieldDecoration;
