import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@heroui/react";
import { useContext } from "react";
import { UserContext } from "../../../../contexts/userContext";
import LogoutButton from "./LogoutButton";
import DarkModeSwitch from "../../DarkModeSwitch";
import { TITLE } from "../../../../constants/app/ui";

const NavbarSettings = (): React.JSX.Element => {

    return (
        <Dropdown disableAnimation classNames={{ content: 'bg-white/50 dark:bg-[#1f2f3f]/50 transition-none bg-transparent backdrop-blur-sm' }}>
            <DropdownTrigger>
                <Profile />
            </DropdownTrigger>
            <DropdownMenu disabledKeys={["profile"]}>
                <DropdownSection showDivider aria-label="profile">
                    <DropdownItem
                        isReadOnly
                        textValue="Perfil"
                        className="opacity-100 p-2"
                        key='profile'
                    >
                        <Profile />
                    </DropdownItem>
                </DropdownSection>

                <DropdownSection showDivider aria-label="theme">
                    <DropdownItem
                        isReadOnly
                        textValue="theme"
                        className="data-[hover=true]:bg-transparent opacity-100 p-2 w-full cursor-default"
                        key="theme"
                    >
                        <Theme />
                    </DropdownItem>
                </DropdownSection>

                <DropdownSection aria-label="logout">
                    <DropdownItem
                        isReadOnly
                        textValue="logout"
                        className="p-0"
                        key='logout'
                    >
                        <LogoutButton />
                    </DropdownItem>
                </DropdownSection>
            </DropdownMenu>
        </Dropdown>
    );
};

export default NavbarSettings;

const Theme = () => {

    return (
        <div className="flex justify-between items-center">
            {TITLE.THEME}
            <DarkModeSwitch />
        </div>
    );
};

interface DropdownItemChild {
    onClick?: () => null;
    onPointerDown?: () => null;
    ref?: any;
};

const Profile: React.FC<DropdownItemChild> = ({
    onClick,
    onPointerDown,
    ref,
}) => {

    // Obtención de los datos de perfil del usuario actual
    const { userData } = useContext(UserContext);

    return (
        <div
            onClick={onClick}
            ref={ref}
            onPointerDown={onPointerDown}
            className="flex justify-end items-center gap-4 w-full cursor-pointer select-none"
        >
            <div className="flex flex-col">
                <p className="justify-end font-semibold text-sm text-end text-ellipsis">{userData.name}</p>
                <p className="text-gray-400 text-xs text-end">{`@${userData.login}`}</p>
            </div>
            <Avatar size="sm" src="cat.jpg" isBordered color="success" />
        </div>
    );
};

