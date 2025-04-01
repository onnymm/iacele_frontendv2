import { Button } from "@heroui/react"
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material"

/** No implementado */
const Paginate = () => {

    return (
        <div className="flex flex-row items-center gap-2">
            <span className="inline-block whitespace-nowrap">15 / 35</span>
            <div className="hidden sm:flex flex-row gap-1">
                <Button isIconOnly size="sm" endContent={<KeyboardArrowLeft className="outline-none" />} />
                <Button isIconOnly size="sm" endContent={<KeyboardArrowRight className="outline-none" />} />
            </div>
            <div className="sm:hidden flex flex-row gap-1">
                <Button isIconOnly endContent={<KeyboardArrowLeft className="outline-none" />} />
                <Button isIconOnly endContent={<KeyboardArrowRight className="outline-none" />} />
            </div>
        </div>
    )
}

export default Paginate;
