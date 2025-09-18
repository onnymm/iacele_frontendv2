import colorMap from "../../adapter/colorMap";

const useComponentColor = (
    color: IACele.UI.UIColor | undefined,
): IACele.Hook.UI.ComponentColor => {

    // Obtención del color adaptado
    const adaptedColor = colorMap[color ?? 'default'];

    return { adaptedColor };
};

export default useComponentColor;
