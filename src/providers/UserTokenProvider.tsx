import { TokenContext } from "../contexts/tokenContext";
import useUserToken from "../hooks/app/useUserToken";

const UserTokenProvider: React.FC<IACeleV2.Application.Provider> = ({
    children,
}) => {

    // Obtención de valores para uso de token de usuario
    const { userToken, setUserToken } = useUserToken();

    return (
        <TokenContext.Provider value={{ userToken, setUserToken }}>
            {children}
        </TokenContext.Provider>
    );
};

export default UserTokenProvider;
