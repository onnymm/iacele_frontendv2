import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from "@mui/icons-material";

/** 
 *  ## Indicador de dirección de ordenamiento.
 *  Este componente renderiza un ícono que indica (si una columna está
 *  ordenando los datos) la dirección de ordenamiento de los datos del
 *  componente {@link Tree}
 *  
 *  `< tsx />` Se autocierra.
 *  
 *  ### Parámetros de entrada
 *  - [ {@link Set<SortingDirectionValue>} ] `direction`: Conjunto que contiene
 *  la dirección de ordenamiento.
 */ 
const SortingIndicator: React.FC<IACele.View.List.SortingIndicator> = ({
    direction
}) => {

    // Definición del ícono en base a la dirección de ordenamiento
    const Icon = (
        direction.has('asc')
            ? KeyboardArrowDownRounded
            : KeyboardArrowUpRounded
    );

    return (
        <Icon fontSize="small" className="text-white" />
    );
};

export default SortingIndicator;
