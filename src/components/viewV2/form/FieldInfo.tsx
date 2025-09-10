import { Popover, PopoverContent, PopoverTrigger, Tooltip } from "@heroui/react";
import useFieldInfo from "../../../hooks/views/useFieldInfo";
import Sizeable from "../../common/Sizeable";
import { Info } from "lucide-react";

const FieldInfo = <M extends ModelName>({
    name,
}: IACeleV2.View.HasFieldName<M>) => {

    // Obtención de la información del campo
    const { fieldInfo } = useFieldInfo<M>(name);

    // Si existe información del campo, se muestra ésta
    if ( fieldInfo ) {
        return (
            <Sizeable>
                {({ view }) => {

                    if ( view === 'desktop' ) {
                        return (
                            <Tooltip color="primary" content={fieldInfo} delay={150} closeDelay={150}>
                                <Info className="outline-none size-3 text-primary-500" />
                            </Tooltip>
                        );
                    } else {
                        return (
                            <Popover color="primary">
                                <PopoverTrigger>
                                    <Info className="outline-none size-3 text-primary-500" />
                                </PopoverTrigger>
                                <PopoverContent>
                                    {fieldInfo}
                                </PopoverContent>
                            </Popover>
                        );
                    };
                }}
            </Sizeable>
        );
    };
};

export default FieldInfo;
