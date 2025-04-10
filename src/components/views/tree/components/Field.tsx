import { useContext } from "react";
import ViewConfigContext from "../../../../contexts/ViewConfigContext";

/** 
 *  ## Campo de tabla
 *  Este componente renderiza una columna en vista de tabla.
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ {@link IACele.API.Database.Table keyof Table[T]} ] `name`: Llave de la columna de la
 *  base de datos de donde se renderizarán los valores.
 *  - [ `string` ] `label`: Nombre explícito de la columna en caso de querer
 *  reemplazar su nombre prestablecido.
 *  - [ `undefined` ] `widget`: Componente preestablecido o personalizado para
 *  renderizar el registro.
 *  - [ {@link IACele.View.Widget.Decoration Decoration} ] `options`: Objeto de validaciones para
 *  colorear el componente según su valor.
 *  - [ `boolean` ] `visible`: Visibilidad inicial como columna en la tabla. Si
 *  este valor es diferente de `undefined` la columna podrá mostrarse y
 *  ocultarse.
 *  - [ `boolean` ] `canSort`: Parámetro que indica que la columna puede
 *  ordenar los datos en base a sus valores.
 */ 
const Field = <T extends IACele.API.Database.TableName>({
    name,
    label,
    widget,
    colorDecoration,
    visible,
    canSort,
}: IACele.View.Tree.Field<T>) => {

    // Obtención de función para añadir configuración de vista
    const { pushViewConfig } = useContext(ViewConfigContext) as IACele.Context.ViewConfig<T>;

    // Se añade la congifuración de la vista de la columna actual
    pushViewConfig({
        name,
        label,
        widget,
        colorDecoration,
        visible,
        canSort,
    });

    // Retorno vacío
    return null;
};

export default Field;