import { UserContext } from "../contexts/userContext";
import useUserData from "../hooks/app/useUserData";

const UserDataProvider: React.FC<IACeleV2.Application.Provider> = ({
    children,
}) => {

    // Obtención de valores y funciones para manejo de datos del usuario
    const { userData, setUserData, removeUserData } = useUserData();

    return (
        <UserContext.Provider value={{ userData, setUserData, removeUserData }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserDataProvider;
