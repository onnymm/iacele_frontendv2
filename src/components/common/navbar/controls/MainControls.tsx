import { useContext, useEffect } from "react";
import MainControlsContext from "../../../../contexts/mainControlsContext";

const MainControls = ({
    children,
}: GenericWrapperComponent) => {

    // Obtención de función desde el contexto
    const { setMainControls } = useContext(MainControlsContext);

    useEffect(
        () => {
            setMainControls(children);

            return (
                () => {setMainControls(null)}
            );
        }, [setMainControls, children]
    );

    return (null);
};

export default MainControls;
