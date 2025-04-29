import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material"
import Sizeable from "../../common/Sizeable"
import { Button } from "@heroui/react"
import useAsyncDisabled from "../../../hooks/app/useAsyncDisabled";

const Pagination: React.FC<IACele.View.Pagination.Navigation> = ({
    count,
    currentPage,
    totalPages,
    prevPage,
    nextPage,
}) => {

    // Inicialización de estados de deshabilitado
    const [ prevDisabled ] = useAsyncDisabled(currentPage === 1);
    const [ nextDisabled ] = useAsyncDisabled(currentPage === totalPages);

    return (
        <Sizeable>
            {({ componentSize }) => (
                <div className="flex flex-row items-center gap-1">
                    {count > 0 &&
                        <span className={`text-sm mr-1 whitespace-nowrap`}>{currentPage}/{totalPages}</span>
                    }
                    {count > 0 &&
                        <Button color="primary" onPress={prevPage} isDisabled={prevDisabled} startContent={<KeyboardArrowLeft className="outline-none" />} size={componentSize} isIconOnly />
                    }
                    {count > 0 &&
                        <Button color="primary" onPress={nextPage} isDisabled={nextDisabled} startContent={<KeyboardArrowRight className="outline-none" />} size={componentSize} isIconOnly />
                    }
                </div>
            )}
        </Sizeable>
    );
};

export default Pagination;
