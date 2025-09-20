import { useContext, useEffect } from "react"
import DynamicControlsContext from "../../../../contexts/dynamicControlsContext";

const DynamicControls = ({
    children,
}: GenericWrapperComponent) => {

    // Obtención de función desde el contexto
    const { setDynamicControls } = useContext(DynamicControlsContext);

    useEffect(
        () => {
            setDynamicControls(children);

            return (
                () => {setDynamicControls(null)}
            );
        }, [setDynamicControls, children]
    );

    return null;
};

export default DynamicControls;
