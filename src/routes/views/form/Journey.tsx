import Form from "../../../components/view/form/Form";

const Journey = () => {

    return (
        <Form modelName="schedule.journey">
            {({ Page, Sheet, Group, Field }) => (
                <Page>
                    <Sheet>
                        <Group label="Nombre">
                            <Field name="name" />
                            <Field name="description" />
                        </Group>
                        <Group label="Horario">
                            <Field name="start_time" />
                            <Field name="end_time" />
                        </Group>
                    </Sheet>
                </Page>
            )}
        </Form>
    );
};

export default Journey;
