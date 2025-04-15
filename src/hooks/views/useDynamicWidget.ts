import { useMemo } from "react";
import computeColor from "../../components/widgets/computeColor";

/** 
 *  ### Widget dinámico
 *  Este Custom Hook recibe los parámetros necesarios para computar y retornar
 *  los valores a proveer a la declaración de un widget dinámico para su
 *  correcta renderización.
 *  
 *  @param record Registro del cual se tomarán los valores para renderizar el
 *  widget dinámico
 *  @param defaultProp Nombre del atributo del que se tomará un valor para
 *  renderizar el widget dinámico.
 *  @param decorationColor Objeto de funciones de validación para colorear el
 *  componente en base a los valores del registro.
 *  @param bypassDefaultColor Parámetro que indica si el color default (gris)
 *  será ignorado y en su logar se usarán negro y blanco en modo claro y oscuro
 *  respectivamente.
 */
const useDynamicWidget = <K extends IACele.API.Database.TableName>(
    record: IACele.View.RecordInDatabase<K>,
    defaultProp: keyof IACele.View.RecordInDatabase<K>,
    decorationColor: IACele.View.Widget.Decoration<K>,
    bypassDefaultColor: boolean,
): DynamicWidgetProps<K> => {

    // Obtención del valor predeterminado a obtener del registro entrante
    const defaultValue = record[defaultProp];

    // Color computado
    const computedColor = useMemo(
        () => (
            computeColor(record, decorationColor)
        ), [record, decorationColor]
    );

    // Color para nombre de clase
    const classNameColor = useMemo(
        () => (
            bypassDefaultColor
                ? (
                    computedColor === 'default'
                        ? 'text-black dark:text-white'
                        : `text-${computedColor}-500`
                )
                : `text-${computedColor}-500`
        ), [bypassDefaultColor, computedColor]
    );

    return { defaultValue, computedColor, classNameColor };
};

interface DynamicWidgetProps<K extends IACele.API.Database.TableName> {
    /** 
     *  ### Valor preestablecido a renderizar
     *  Valor que se utilizará para renderizar en el widget dinámico.
     */ 
    defaultValue: IACele.View.RecordInDatabase<K>[keyof IACele.View.RecordInDatabase<K>];
    /** 
     *  ### Color computado
     *  Color computado en base a validaciones provistas para evaluar con el
     *  registro entrante, para uso en componente de HeroUI.
     */ 
    computedColor: IACele.UI.DecorationColor;
    /** 
     *  ### Nombre de clase de color
     *  Este valor se usa para envolver el retorno del widget dinámico en un div
     *  que provee el color computado para poder colorear correctamente un
     *  componente personalizado.
     */ 
    classNameColor: string;
};

export default useDynamicWidget;
