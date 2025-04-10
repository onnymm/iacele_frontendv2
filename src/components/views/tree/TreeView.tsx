import Field from "./components/Field";
import Page from "./components/Page";

/** 
 *  ## Vista de árbol
 *  Este componente renderiza una tabla que muestra uno o más registros de una
 *  tabla de base de datos.
 *  
 *  `< tsx >...</ tsx >` Contiene elementos hijos.
 *  
 *  ### Parámetros de entrada
 *  - [ {@link IACele.API.Database.TableName T} ] `table`: Nombre de la tabla
 *  de base de datos para extraer los nombres de los campos.
 *  - [ {@link IACele.View.Tree.ViewConfig ViewConfig} ] `viewConfig`:
 *  Configuración de vista de columnas de la tabla.
 *  - [ `string` ] `emptyContent`: Leyenda para mostrar cuando no existan datos
 *  a mostrar.
 */ 
const TreeView = <T extends IACele.API.Database.TableName>({
    children,
}: IACele.View.Tree.ChildrenRender<T>) => {

    return ( children({ Field, Page }) );
};

export default TreeView;
