import { useCallback, useState } from "react";
import userTemplate from "../../constants/userTemplate";

const useUserData = (): IACeleV2.Hook.Application.UserData => {

    // Inicialización del usuario actual
    const [ userData, setUserData ] = useState<IACeleV2.Application.CurrentUserData>(userTemplate);

    // Inicialización de función de remoción de los datos del usuario
    const removeUserData = useCallback(
        () => {
            setUserData(userTemplate);
        }, []
    );

    return { userData, setUserData, removeUserData };
};

export default useUserData;
