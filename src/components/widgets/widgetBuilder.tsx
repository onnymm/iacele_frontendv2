import { useMemo } from "react";
import computeColor from "./computeColor";

const widgetBuilder = <T extends IACele.API.Database.TableName>(widget: IACele.View.Widget.Component<T>) => {

    // Función que recibe los atributos para crear el widget
    const propsReceiver: IACele.View.Widget.PropsReceiver = (
        defaultProp,
        options,
        table,
        record,
    ) => {

        // Constructor de widget dinámico
        const DynamicWidget: IACele.View.Widget.Callback = ({ [ defaultProp ]: defaultValue }) => {

            // Color computado
            const color = useMemo(
                () => ( computeColor(record, options) ), []
            );

            // Creación y retorno de widget final
            return widget({ table , record, defaultValue, defaultProp, color, } as unknown as IACele.View.Widget.Declaration<T>);
        };

        // Se retorna el widget definido para ser renderizado
        return DynamicWidget;
    };

    // Retorno del receptor de atributos
    return propsReceiver;
};

export default widgetBuilder;
