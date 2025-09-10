import { Alert, Button, Form } from "@heroui/react";
import Group from "../components/layout/Group";
import MiniGrapper from "../components/layout/MiniGrapper";
import { useEffect, useState } from "react";
import InputUser from "../components/ui/input/InputUser";
import InputPassword from "../components/ui/input/InputPassword";
import DarkModeSwitch from "../components/common/DarkModeSwitch";
import useViewName from "../hooks/app/usePageName";
import useLogin from "../hooks/app/useLogin";
import { TITLE } from "../constants/app/ui";

const Login = (): (React.JSX.Element) => {

    // Obtención de la función de cambio de estado para establecer el nombre de la vista
    const { setViewName } = useViewName();
    // Obtención de función de inicio de sesión y estado para mensaje de error
    const { login, errorMessage } = useLogin();

    // Valores para control de formulario
    const [ user, setUser ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');

    // Se establece el nombre de la vista
    useEffect(
        () => {
            setViewName(TITLE.LOGIN);
        }, [setViewName]
    );

    return (
        <Form
            onSubmit={login}
            className="flex justify-center items-center h-full"
        >
            <MiniGrapper>
                <Group title="Ingresa tus datos">
                    <InputUser value={user} onValueChange={setUser} />
                    <InputPassword value={password} onValueChange={setPassword} />
                    <Button type="submit" color="primary" isDisabled={user === '' || password === ''}>
                        {TITLE.LOGIN}
                    </Button>
                    {errorMessage &&
                        <Alert color="danger">
                            {errorMessage}
                        </Alert>
                    }
                    <div className="flex justify-end pt-2 w-full">
                        <DarkModeSwitch />
                    </div>
                </Group>
            </MiniGrapper>
        </Form>
    );
};

export default Login;
