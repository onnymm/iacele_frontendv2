import { Button } from "@heroui/react";
import { TITLE } from "../../../../constants/app/ui";
import useLogout from "../../../../hooks/app/useLogout";
import { LogOut } from "lucide-react";

const LogoutButton = () => {

    // Obtención de función para cierre de sesión
    const { logout } = useLogout();

    return (
        <Button
            onPress={logout}
            size="sm"
            variant="ghost"
            className="flex justify-between w-full"
            color="danger"
        >
            {TITLE.LOGOUT}
            <LogOut className="size-4" />
        </Button>
    );
};

export default LogoutButton;
