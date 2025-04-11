import { useCallback, useMemo } from "react";
import ViewConfigContext from "../../../contexts/ViewConfigContext";
import TreeView from "../tree/TreeView";
import ListDataFetcher from "./ListDataFetcher";
import OpenRecordPath from "../../../contexts/OpenRecordPath";

/** 
 *  ## Lista de registros
 *  Este componente renderiza una vista de uno o más registros en forma de
 *  tabla o kanban recibiendo una declaración de la estructura de la vista por
 *  medio de una función flecha.
 *  
 *  `< tsx >...</ tsx >` Contiene elementos hijos.
 *  
 *  ### Parámetros de entrada
 *  - [ {@link IACele.API.Database.TableName T} ] `table`: Nombre de la tabla
 *  de base de datos para extraer
 *  los nombres de los campos.
 *  - [ `string` ] `emptyContent`: Leyenda para mostrar cuando no existan datos
 *  a mostrar.
 *  - [ {@link IACele.View.List.ChildrenRender ChildrenRender} ] `children`: Declaración de estructura de
 *  vista de árbol y kanban.
 */ 
const List = <T extends IACele.API.Database.TableName>({
    table,
    emptyContent,
    children,
    open,
}: IACele.View.List.Component<T>) => {

    const viewConfig: IACele.View.Tree.ViewConfig<T> = useMemo(
        () => ([]), []
    );

    // Función para añadir configuraciones de columnas
    const pushViewConfig = useCallback(
        (config: IACele.View.Tree.Field<T>) => {

            // Se busca el parámetro para saber si ya se encuentra en la configuración de la vista
            const foundItem = viewConfig.find( (item) => (item.name === config.name) );

            // Solo si éste no se encuentra, se añade
            if ( foundItem === undefined ) viewConfig.push(config);
        }, [viewConfig]
    );

    return (
        <ViewConfigContext.Provider value={{ pushViewConfig }}>
        <OpenRecordPath value={{ open }}>

            {/* Aquí se genera el objeto viewConfig */}
            {children({ Tree: TreeView<T> })}

            {/* Aquí se utiliza el objeto viewConfig */}
            <ListDataFetcher
                table={table}
                viewConfig={viewConfig}
                emptyContent={emptyContent}
            />

        </OpenRecordPath>
        </ViewConfigContext.Provider>
    );
};

export default List;