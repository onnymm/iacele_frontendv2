import useDynamicWidget from "../../hooks/views/useDynamicWidget";

/** 
 *  ## Constructor de widget
 *  Esta función recibe una función que destructura propiedades computadas para
 *  renderizar un widget dinámico.
 *  
 *  ### Parámetros de entrada
 *  - [ {@link IACele.View.Widget.Component function} ] Función que retorna un
 *  componente TSX.
 *  
 *  ### Retorno
 *  Esta función retorna:
 *  
 *  - [ {@link IACele.View.Widget.PropsReceiver PropsReceiver} ]
 *  
 *      ## Receptor de atributos
 *      Función que recibe las propiedades usadas para renderizar el widget
 *      provisto desde la función {@link widgetBuilder}.
 *  
 *      ### Parámetros de entrada
 *      - [ `keyof` {@link IACele.View.RecordInDatabase<K> RecordInDatabase } ]
 *      `defaultProp`: Nombre del atributo del registro de base de base de datos.
 *      - [ {@link IACele.View.Widget.Decoration Decoration } ] `colorDecoration`:
 *      Funciones de color de decoración de componente.
 *      - [ {@link IACele.API.Database.TableName TableName} ] `table`: Nombre de la
 *      tabla de origen de registro de base de datos.
 *      - [ `boolean` ] `bypassDefaultColor`: Indicador de si se ignorará el color
 *      default de decoración computado.
 *  
 *      ### Retorno
 *      Esta función retorna:
 *      - [ {@link IACele.View.Widget.Callback DynamicWidget} ]
 *      
 *          ## Widget dinámico
 *          Este componente recibe el registro del cual renderizará uno o más
 *          valores.
 *  
 *          ### Parámetros de entrada
 *          - [ {@link IACele.View.RecordInDatabase RecordInDatabase} ]
 *          `record` Registro del cual se extraerán los atributos para
 *          renderizar el componente.
 */ 
const widgetBuilder = <K extends IACele.API.Database.TableName>(widget: IACele.View.Widget.Component<K>) => {

    // Función que recibe los atributos para crear el widget
    const propsReceiver: IACele.View.Widget.PropsReceiver = (
        defaultProp,
        colorDecoration,
        table,
        bypassDefaultColor,
    ) => {

        /** 
         *  ## Widget dinámico
         *  Este componente recibe el registro del cual renderizará uno o más
         *  valores.
         *  
         *  ### Parámetros de entrada
         *  - [ {@link IACele.View.RecordInDatabase RecordInDatabase} ]
         *  `record` Registro del cual se extraerán los atributos para
         *  renderizar el componente.
         */ 
        const DynamicWidget: IACele.View.Widget.Callback = (record) => {

            // Obtención de valores para proveer al widget
            const { defaultValue, computedColor, classNameColor } = useDynamicWidget(record, defaultProp, colorDecoration, bypassDefaultColor);

            if ( defaultValue !== undefined && defaultValue !== null )
            // Creación y retorno de widget final
            return (
                <div className={classNameColor}>
                    {widget({ table , record, defaultValue, defaultProp, color: computedColor } as unknown as IACele.View.Widget.Declaration<K>)}
                </div>
            );
        };

        // Se retorna el widget definido para ser renderizado
        return DynamicWidget;
    };

    // Retorno del receptor de atributos
    return propsReceiver;
};

export default widgetBuilder;
