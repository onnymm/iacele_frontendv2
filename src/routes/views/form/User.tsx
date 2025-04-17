import Form from "../../../components/views/form/Form";

const User = () => {

    return (
        <Form<'base.users'> table="base.users" readonly>
            {({ Field, Group, Page, Sheet }) => (
                <Page>
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
    )
}

export default User;
