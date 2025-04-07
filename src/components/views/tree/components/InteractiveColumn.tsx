import { useContext, useMemo } from "react";
import SortingIndicator from "./SortingIndicator";
import SortingFieldContext from "../../../../contexts/sortingFieldContext";
import { UnfoldMoreRounded } from "@mui/icons-material";
import Tree from "../Tree"; // eslint-disable-line

/** 
 *  ## Columna interactiva
 *  Este componente renderiza el contenido de una columna para el componente 
 *  {@link Tree}
 *   
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ {@link IACele.View.List.ViewConfig<IACele.API.DataTypes.GenericRecord>}
 *  ] `viewConfig`: Configuración de columnas.
 *  - [ `string` ] `columnKey`: Llave de columna actual.
 *  - [ `string` ] `label`: Nombre visible de la columna.
 *  - [ {@link Set<SortingDirectionValue>} ] `ascendingDirection`: Conjunto que
 *  contiene la dirección de ordenamiento.
 */
const InteractiveColumn: React.FC<IACele.View.List.InteractiveColumn> = ({
    columnKey,
    label,
    viewConfig,
}) => {

    // Obtención de estados desde el contexto para ordenamiento de columnas
    const { sortingFieldKey, selectedSortingDirection, toggleSortingColumn } = useContext(SortingFieldContext);
    // Evaluación de si la columna está ordenando los datos actualmente
    const isSorting = sortingFieldKey === columnKey;

    // Definición de si el campo puede ordenar datos
    const isSorteable = useMemo(
        () => {

            // Obtención de los parámetros de la columna
            const columnParams = viewConfig.find( (item) => (item.key) === columnKey ) as IACele.View.List._TableColumnConfig<IACele.API.DataTypes.GenericRecord>;

            // Retorno de si la columna puede ordenar datos
            return ( columnParams.canSort !== false );
        }, [columnKey, viewConfig]
    );

    // Función para ejecutar en clic
    const sortCallback = () => {
        if ( !isSorteable ) return;

        toggleSortingColumn(columnKey);
    };

    return (
        <div onClick={sortCallback} className={`${isSorting ? 'bg-primary-500/20 dark:bg-primary-500/60 backdrop-brightness-100' : ''} ${isSorteable ? 'group ui-sorteable-column cursor-pointer hover:backdrop-brightness-[100%] hover:bg-primary-500/50 dark:hover:bg-primary-500/50' : ''} px-3 bg-white font-normal text-sm dark:text-white dark:bg-[#1f2f3f]/40 backdrop-brightness-[10%] pointer-events-auto transition-colors shadow-sm backdrop-blur-sm size-full flex flex-row items-center justify-between`}>
            <span className="pr-2">{label}</span>
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
