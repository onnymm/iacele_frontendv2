import { useCallback, useContext, useMemo } from "react";
import { UnfoldMoreRounded } from "@mui/icons-material";
import SortingFieldContext from "../../../../contexts/sortingFieldContext";
import { tableProperties } from "../../../../constants/views/names";
import SortingIndicator from "./SortingIndicator";

/** 
 *  ## Columna interactiva
 *  Este componente renderiza el contenido de una columna para el componente 
 *  {@link Tree}
 *   
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ {@link IACele.API.Database.TableName T} ] `table`: Nombre de la tabla de base de datos para extraer 
 *  los nombres de los campos.
 *  - [ {@link IACele.API.Database.Table keyof IACele.View.RecordInDatabase} ] `columnKey`: Llave del campo de 
 *  la tabla de base de datos a renderizar como columna.
 *  - [ `string` ] `label`: Nombre explícito del campo en caso de querer 
 *  reemplazar su nombre prestablecido.
 *  - [ {@link IACele.View.Tree.ViewConfig ViewConfig } ] `viewConfig`: Configuración de vista de 
 *  columnas de la tabla.
 */ 
const InteractiveColumn = <T extends IACele.API.Database.TableName>({
    viewConfig,
    columnKey,
    label,
    table,
}: IACele.View.Tree.InteractiveColumn<T>) => {

    // Obtención de estados desde el contexto para ordenamiento de columnas
    const { sortingFieldKey, selectedSortingDirection, toggleSortingColumn } = useContext(SortingFieldContext);
    // Evaluación de si la columna está ordenando los datos actualmente
    const isSorting = sortingFieldKey === columnKey;

    // Definición de si el campo puede ordenar datos
    const isSorteable = useMemo(
        () => {

            // Obtención de los parámetros de la columna
            const columnParams = viewConfig.find( (item) => (item.name) === columnKey ) as IACele.View.Tree.Field<T>;

            // Retorno de si la columna puede ordenar datos
            return ( columnParams.canSort !== false );
        }, [columnKey, viewConfig]
    );

    // Función para ejecutar en clic
    const sortCallback = useCallback(
        () => {
            if ( !isSorteable ) return;
    
            toggleSortingColumn(columnKey as string);
        }, [isSorteable, toggleSortingColumn, columnKey]
    );

    // Leyenda computada
    const computedLabel = (
        label
            ? label
            : tableProperties[table as T][columnKey].name
    );

    return (
        <div onClick={sortCallback} className={`${isSorting ? 'bg-primary-500/20 dark:bg-primary-500/60 backdrop-brightness-100' : ''} ${isSorteable ? 'group ui-sorteable-column cursor-pointer hover:backdrop-brightness-[100%] hover:bg-primary-500/50 dark:hover:bg-primary-500/50' : ''} px-3 bg-white font-normal text-sm dark:text-white dark:bg-[#1f2f3f]/40 backdrop-brightness-[10%] pointer-events-auto transition-colors shadow-sm backdrop-blur-sm size-full flex flex-row items-center justify-between`}>
            <span className="pr-2">{computedLabel}</span>
            {sortingFieldKey === columnKey &&
                <SortingIndicator direction={selectedSortingDirection} />
            }
            {sortingFieldKey !== columnKey && isSorteable &&
                <UnfoldMoreRounded fontSize="small" className="opacity-0 min-w-2 h-2 transition-opacity ui-sorteable-indicator" />
            }
        </div>
    );
};

export default InteractiveColumn;
