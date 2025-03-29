import { useMemo } from "react";
import computeColor from "./computeColor";

const widgetBuilder = (widget: IACele.Core.Widget.WidgetConstructor) => {

    // Función que recibe los atributos para crear el widget
    const propsReceiver: IACele.Core.Widget.PropsReceiverForWidget = (
        key,
        options,
        tableName,
        record,
    ) => {

        // Constructor de widget dinámico
        const DynamicWidget: IACele.Core.Widget._Widget = ({ [ key ]: value }) => {

            // Color computado
            const color = useMemo(
                () => ( computeColor(record, options) ), []
            );

            // Creación y retorno de widget final
            return widget({ value, key, tableName, record, color });
        };

        // Se retorna el widget definido para ser renderizado
        return DynamicWidget;
    };

    // Retorno del receptor de atributos
    return propsReceiver;
};

export default widgetBuilder;
