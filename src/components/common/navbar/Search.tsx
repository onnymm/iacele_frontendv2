import { Button, Input } from "@heroui/react"
import { SearchRounded } from "@mui/icons-material";

/** No implementado */
const Search = () => {

    return (
        <div>
            <div className="sm:hidden">
                <Button isIconOnly endContent={<SearchRounded />} />
            </div>
            <div className="hidden sm:block">
                <Input
                    classNames={{input: 'px-2'}}
                    type="text"
                    size="sm"
                    placeholder="Buscar..."
                    endContent={<SendSearch />}
                />
            </div>
        </div>
    )
}

export default Search;

const SendSearch = () => {

    return (
        <button>
            <SearchRounded className="outline-none hover:text-primary-500 transition-colors" />
        </button>
    )
}
