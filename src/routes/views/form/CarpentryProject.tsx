import Form from "../../../components/view/form/Form";

const CarpentryProject = () => {

    return (
        <Form modelName="carpentry.project">
            {({ Page, Sheet, Group, Field, Notebook }) => (
                <Page>
                    <Sheet>
                        <Group label="Proyecto">
                            <Field name="name" />
                            <Field name="user_id" domain={[['active', '=', true]]} />
                        </Group>
                        <Group label="Estadísticas">
                            <Field name="done_activities" />
                            <Field name="remaining_activities" />
                        </Group>
                        <Group label="Tiempo">
                            <Field name="total_time" />
                            <Field name="remaining_time" />
                        </Group>
                        <Group label="Historial">
                            <Field name="create_date" readonly />
                            <Field name="write_date" readonly />
                        </Group>
                        <Notebook>
                            {({ Pages, Page}) => (
                                <Pages>
                                    <Page label="Actividades">
                                        <Field name="activity_ids">
                                            {({ Tree, Field }) => (
                                                <Tree>
                                                    <Field name="project_id" />
                                                    <Field name="name" label="Actividad" />
                                                    <Field name="start_date" />
                                                    <Field name="end_date" />
                                                    <Field name="duration" />
                                                    <Field name="done" />
                                                    <Field name="is_unattended" label="Es manual" />
                                                </Tree>
                                            )}
                                        </Field>
                                    </Page>
                                    <Page label="Detalles">
                                        <Field name="user_id" />
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

export default CarpentryProject;
