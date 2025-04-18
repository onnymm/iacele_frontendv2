import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material"
import Sizeable from "../../common/Sizeable"
import { Button } from "@heroui/react"
import useAsyncDisabled from "../../../hooks/app/useAsyncDisabled";

interface PaginationParams {
    count: number;
    page: number;
    chunks: number;
    prevPage: () => void;
    nextPage: () => void;
};

const Pagination: React.FC<PaginationParams> = ({
    count,
    page,
    chunks,
    prevPage,
    nextPage,
}) => {

    // Inicialización de estados de deshabilitado
    const [ prevDisabled ] = useAsyncDisabled(page === 1);
    const [ nextDisabled ] = useAsyncDisabled(page === chunks);

    return (
        <Sizeable>
            {({ componentSize, textSize }) => (
                <div className="flex flex-row items-center gap-1">
                    {count > 0 &&
                        <span className={`${textSize} mr-1`}>{page} / {chunks}</span>
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
