import useFetchUser from "../hooks/app/useFetchUser";

const UserAuthenticationProvider: React.FC<IACeleV2.Application.Provider> = ({
    children,
}) => {

    // Uso del hook de obtención de los datos del usuario actual
    useFetchUser();

    return ( children );
};

export default UserAuthenticationProvider;
