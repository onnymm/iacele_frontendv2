import useExecuteFormValidation from "./useExecuteFormValidation";

const useIsInvisible = <M extends ModelName>(
    invisible: IACeleV2.View.UsingRecord<M, boolean> | undefined,
): IACeleV2.View.ComputedIsInvisible => {

    // Obtención de la función de validación
    const { executeFormValidation } = useExecuteFormValidation<M>();

    // Cálculo del valor de invisibilidad
    const computedIsInvisible = executeFormValidation(invisible);

    return { computedIsInvisible };
};

export default useIsInvisible;
