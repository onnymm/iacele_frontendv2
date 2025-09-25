import Form from "../../../components/view/form/Form";

const Model = () => {

    return (
        <Form modelName="base.model">
            {({ Page, Sheet, Group, Field, Notebook }) => (
                <Page>
                    <Sheet>
                        <Group label="Datos principales">
                            <Field name="name" />
                            <Field name="model" />
                        </Group>
                        <Group label="Ayuda">
                            <Field name="description" />
                        </Group>
                        <Group label="Información">
                            <Field name="label" />
                        </Group>
                        <Group label="Relacionados">
                            <Field name="related_field_ids" />
                        </Group>
                        <Notebook>
                            {({ Pages, Page }) => (
                                <Pages>
                                    <Page label="Campos">
                                        <Field name="field_ids">
                                            {({ Tree, Field }) => (
                                                <Tree>
                                                    <Field name="name" />
                                                    <Field name="label" />
                                                    <Field name="ttype" />
                                                    <Field name="nullable" />
                                                    <Field name="readonly" />
                                                    <Field name="is_required" />
                                                    <Field name='name' />
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

export default Model;
