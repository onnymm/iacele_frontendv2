import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from "@mui/icons-material";

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
