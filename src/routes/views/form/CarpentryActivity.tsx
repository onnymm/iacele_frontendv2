import Form from "../../../components/view/form/Form";

const CarpentryLine = () => {

    // Línea de actividad de proyecto de carpintería
    return (
        <Form modelName="carpentry.activity.line">
            {({ Page, Header, Action, Sheet, Group, Field }) => (
                <Page>
                    <Header>
                        <Action name="mark_as_done" label="Marcar como completada" color="success" invisible={({ done }) => (done)} />
                        <Action name="mark_as_undone" label="Marcar como incompleta" invisible={({ done }) => (!done)} />
                    </Header>
                    <Sheet>
                        <Group label="Proyecto">
                            <Field name="name" />
                            <Field name="project_id" readonly={({ done }) => (done)} />
                        </Group>
                        <Group label="Detalles">
                            <Field name="done" />
                            <Field name="is_unattended" readonly={({ done }) => (done)} />
                        </Group>
                        <Group label="Planificación" >
                            <Field name="start_date" readonly={({ done }) => (done)} />
                            <Field name="end_date" readonly={({ done }) => (done)} />
                            <Field name="duration" readonly={({ done }) => (done)} />
                        </Group>
                    </Sheet>
                </Page>
            )}
        </Form>
    );
};

export default CarpentryLine;
