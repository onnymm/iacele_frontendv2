import widgets from "../../widgets/Presets";

const RenderedWidget = <K extends IACele.API.Database.TableName>({
    name,
    widget,
    colorDecoration = {},
    record,
    table,
}: IACele.View.Kanban.RenderedWidget<K>) => {

    // Si el widget es predeterminado
    if ( typeof widget === 'string' ) {

        // Obtención del constructor dinámico
        const dynamicWidget = widgets[widget](
            name,
            colorDecoration,
            table,
            true,
        );

        // Retorno de la renderización del widget
        return ( dynamicWidget(record) );

    // Si el widget es personalizado
    } else if ( typeof widget === 'function' ) {
        // Retorno de la renderización del widget
        return ( widget( record ) );

    // Si no se declaró widget
    } else {
        // Se retorna el texto crudo
        return ( record[name] as string );
    };
};

export default RenderedWidget;
