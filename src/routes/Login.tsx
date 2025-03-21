import { Alert, Button, Form } from "@heroui/react";
import Group from "../components/layout/Group";
import MiniGrapper from "../components/layout/MiniGrapper";
import { useState } from "react";
import InputUser from "../ui/input/InputUser";
import InputPassword from "../ui/input/InputPassword";
import useUserAuthentication from "../hooks/app/useUserAuthentication";

const Login = (): (React.JSX.Element) => {

    // Obtención de función de autenticación
    const userLogin = useUserAuthentication();

    // Valores para control de formulario
    const [ user, setUser ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');
    const [ errorMessage, setErrorMessage ] = useState<string>('');

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Obtención de los valores del formulario
        const { username, password } = Object.fromEntries(new FormData(event.currentTarget));

        // Envío de datos
        await userLogin(username as string, password as string, setErrorMessage);
    }

    return (
        <Form
            onSubmit={onSubmit}
            className="flex justify-center items-center h-full"
        >
            <MiniGrapper>
                <Group title="Ingresa tus datos">
                    <InputUser value={user} onValueChange={setUser} />
                    <InputPassword value={password} onValueChange={setPassword} />
                    <Button type="submit" color="primary" isDisabled={user === '' || password === ''}>Iniciar sesión</Button>
                    {errorMessage &&
                        <Alert color="danger">
                            {errorMessage}
                        </Alert>
                    }
                </Group>
            </MiniGrapper>
        </Form>
    );
};

export default Login;
