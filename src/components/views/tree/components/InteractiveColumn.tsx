import { UnfoldMoreRounded } from "@mui/icons-material";
import SortingIndicator from "./SortingIndicator";
import useInteractiveColumn from "../../../../hooks/views/useInteractiveColumn";

/** 
 *  ## Columna interactiva
 *  Este componente renderiza el contenido de una columna para el componente 
 *  {@link Tree}
 *   
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ {@link IACele.API.Database.TableName TableName} ] `table`: Nombre de la
 *  tabla de base de datos para extraer los nombres de los campos.
 *  - [ {@link IACele.API.Database.Table keyof IACele.View.RecordInDatabase} ]
 *  `columnKey`: Llave del campo de la tabla de base de datos a renderizar com
 *   columna.
 *  - [ `string` ] `label`: Nombre explícito del campo en caso de querer 
 *  reemplazar su nombre prestablecido.
 *  - [ {@link IACele.View.Tree.ViewConfig ViewConfig } ] `viewConfig`:
 *  Configuración de vista de columnas de la tabla.
 */ 
const InteractiveColumn = <T extends IACele.API.Database.TableName>({
    viewConfig,
    columnKey,
    label,
    table,
}: IACele.View.Tree.InteractiveColumn<T>) => {

    // Obtención de estados, funciones de cambio de estado y funciones personalizadas para uso en columna
    const { sortingFieldKey, selectedSortingDirection, isSorting, isSorteable, sortCallback, computedLabel } = useInteractiveColumn(viewConfig, columnKey, label, table);

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
