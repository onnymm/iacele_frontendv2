import Form from "../../../components/views/form/Form";

const User = () => {

    return (
        <Form<'base.users'> table="base.users" readonly>
            {({ Field, Group, Page, Sheet, Header, Action }) => (
                <Page>
                    <Header>
                        <Action color="secondary" name="Activar" execute="activate_user" invisible={({ active }) => (active)} />
                        <Action color="danger" name="Desactivar" execute="deactivate_user" confirm="¿Seguro que deseas desactivar al usuario?" invisible={({ active }) => (!active)} />
                        <Action name="Reestablecer contraseña" execute="reset_password" notify="Se ha reestablecido la contraseña del usuario." invisible={({ active }) => (!active)} />
                    </Header>
                    <Sheet>
                        <Group label='Datos básicos'>
                            <Field name="name" />
                            <Field name="user" />
                            <Group>
                                <Field name="id"/>
                                <Field name="odooId"/>
                            </Group>
                        </Group>
                        <Group label='Historial'>
                            <Field name="createDate" />
                            <Field name="writeDate" />
                            <Field name="active" />
                        </Group>
                    </Sheet>
                </Page>
            )}
        </Form>
    );
};

export default User;
