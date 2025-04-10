/** 
 *  ## Computar color de decoración
 *  Esta función recibe las funciones de evaluación de valor y las ejecuta para
 *  computar el color que utilzará un elemento UI, en base a los valores del
 *  registro provisto.
 *  
 *  ### Notas
 *  Si más de una función de color de decoración retorna `true`, la última en
 *  evaluarse reescribirá el color final computado. Las funciones se ejecutan
 *  en el siguiente orden:
 *  - `info`
 *  - `success`
 *  - `warning`
 *  - `danger`
 *  
 *  ### Retorno
 *  Esta función retorna:
 *  - {@link IACele.UI.DecorationColor} `color`: Color computado para ser
 *  utilizado en un componente UI.
 */ 
const computeColor: <T extends IACele.API.Database.TableName>(
    record: IACele.API.Database.Table[T],
    options: IACele.View.Widget.Decoration<T>,
) => (IACele.UI.DecorationColor) = (record, options) => {

    // Inicialización del color en valor default
    let color: IACele.UI.DecorationColor = 'default';

    // Evaluación de reglasm dando prioridad de abajo hacia arriba
    if ( options.info && options.info(record) ) color = 'secondary';
    if ( options.success && options.success(record) ) color = 'success';
    if ( options.warning && options.warning(record) ) color = 'warning';
    if ( options.danger && options.danger(record) ) color = 'danger';

    // Retorno del color computado
    return color;
};

export default computeColor;
