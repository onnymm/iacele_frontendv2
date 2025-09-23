import useExecuteFormValidation from "../useExecuteFormValidation";

const useIsInvisible = <M extends ModelName>(
    invisible: IACele.View.UsingRecordAndUser<M, boolean> | undefined,
): IACele.View.ComputedIsInvisible => {

    // Obtención de la función de validación
    const { executeFormValidation } = useExecuteFormValidation<M>();

    // Cálculo del valor de invisibilidad
    const computedIsInvisible = executeFormValidation(invisible);

    return { computedIsInvisible };
};

export default useIsInvisible;
