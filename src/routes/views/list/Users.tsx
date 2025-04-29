import List from "../../../components/views/list/List";

const Users = () => {

    return (
        <List table="base.users" emptyContent="No hay datos" open="/view/form/user">
            {({ Tasks, Task }) => (
                <Tasks>
                    <Task execute="update_users" name="Actualizar" color="secondary" confirm="Usuarios actualizados." />
                </Tasks>
            )}
            {({ Tree }) => (

                <Tree>
                    {({ Page, Field }) => (

                        <Page>
                            <Field name="id" />
                            <Field name="user" widget='chip' colorDecoration={{ success: ({ active }) => (active), warning: ({ active }) => (!active) }} />
                            <Field name="name" visible={true} />
                            <Field name="active" visible={false} widget='toggle' />
                            <Field name="odooId" widget='codeline' />
                            <Field name="password" visible={false} />
                        </Page>

                    )}
                </Tree>

            )}
            {({ Kanban, Field, Section }) => (
                <Kanban>
                    <Section>
                        <Field name="odooId" widget='codeline' />
                        <Field name="user" widget='chip' colorDecoration={{ success: ({ active }) => (active), warning: ({ active }) => (!active) }} />
                    </Section>
                    <Section>
                        <Field name="name" widget='char' />
                        <Field name="active" widget='check' label />
                    </Section>
                </Kanban>
            )}
        </List>
    );
};

export default Users;
