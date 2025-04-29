import { Input } from "@heroui/react"
import { SearchRounded } from "@mui/icons-material";
import Button from "../../ui/Button";

/** No implementado */
const Search = () => {

    return (
        <div className="flex items-center">
            <div className="lg:hidden flex items-center">
                <Button onPress={() => null} isIconOnly endContent={<SearchRounded className="pointer-events-none" />} />
            </div>
            <div className="hidden lg:block">
                <Input
                    classNames={{input: 'px-2'}}
                    type="text"
                    size="sm"
                    placeholder="Buscar..."
                    endContent={<SendSearch />}
                />
            </div>
        </div>
    );
};

export default Search;

const SendSearch = () => {

    return (
        <button>
            <SearchRounded className="outline-none hover:text-primary-500 transition-colors" />
        </button>
    );
};
