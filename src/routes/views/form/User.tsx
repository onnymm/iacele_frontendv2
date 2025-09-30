import Form from "../../../components/view/form/Form";

const User = () => {

    return (
        <Form modelName="base.users">
            {({ Page, Header, Action, Sheet, Group, Field, Notebook, Alert }) => (
                <Page>
                    <Header>
                        <Action name="activate" label="Activar" color="success" invisible={({ active }) => (active)} />
                        <Action name="deactivate" label="Desactivar" color="danger" invisible={({ active, uid, id }) => (!active || uid === id)} confirm="¿Deseas desactivar a este usuario?" />
                        <Action name="sync_on" label="Activar sincronización" color="info" invisible={({ sync, active }) => (!active || sync)} />
                        <Action name="sync_off" label="Desactivar sincronización" color="warning" invisible={({ sync, active }) => (!active || !sync)} />
                        <Action name="reset_password" label="Restablecer contraseña" invisible={({ active, uid, id }) => (!active || uid === id)} notify="La contraseña se ha restablecido exitosamente." />
                        <Alert color="warning" invisible={({ active }) => (active)}>Este usuario está inactivo</Alert>
                    </Header>
                    <Sheet>
                        <Group label="Datos principales">
                            <Field name="login" groups={['admin_user']}  />
                            <Field name="name" />
                        </Group>
                        <Group label="Personalización">
                            <Field name="profile_picture" widget="profile" />
                        </Group>
                        <Notebook>
                            {({ Pages, Page }) => (
                                <Pages>
                                    <Page label="Ajustes" invisible={({ active }) => (!active)}>
                                        <Group label="Activo y sincronización">
                                            <Field name="active" readonly  />
                                            <Field name="sync" decoration={{ success: true }} widget="switch" readonly />
                                        </Group>
                                    </Page>
                                    <Page groups={['admin_user']} label="Historial">
                                        <Group label="Fecha">
                                            <Field name="create_date" />
                                            <Field name="write_date" />
                                        </Group>
                                        <Group label="Responsable">
                                            <Field name="create_uid" />
                                            <Field name="write_uid" />
                                        </Group>
                                    </Page>
                                    <Page label="Roles">
                                        <Field name="role_ids">
                                            {({ Tree, Field }) => (
                                                <Tree>
                                                    <Field name="name" />
                                                    <Field name="group_ids" />
                                                </Tree>
                                            )}
                                        </Field>
                                    </Page>
                                </Pages>
                            )}
                        </Notebook>
                    </Sheet>
                </Page>
            )}
        </Form>
    );
};

export default User;
