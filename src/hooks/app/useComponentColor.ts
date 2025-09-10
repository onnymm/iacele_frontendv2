import colorMap from "../../adapter/colorMap";

const useComponentColor = (
    color: IACeleV2.UI.UIColor | undefined,
): IACeleV2.Hook.UI.ComponentColor => {

    // Obtención del color adaptado
    const adaptedColor = colorMap[color ?? 'default'];

    return { adaptedColor };
};

export default useComponentColor;
