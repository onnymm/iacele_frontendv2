import Form from "../../../components/view/form/Form";

const Field = () => {

    return (
        <Form modelName="base.model.field">
            {({ Page, Sheet, Group, Field }) => (
                <Page>
                    <Sheet>
                        <Group label="Información principal">
                            <Field name="model_id" />
                            <Field name="name" />
                            <Field name="label" />
                            <Field name="ttype" />
                        </Group>
                        <Group label="Parámetros">
                            <Field widget="switch" name="nullable" />
                            <Field widget="switch" name="is_required" />
                            <Field widget="switch" name="readonly" />
                            <Field widget="switch" name="unique" />
                        </Group>
                        <Group label="Información">
                            <Field name="help_info" />
                        </Group>
                        <Group label="Relación" invisible={({ ttype }) => (ttype !== 'many2one' && ttype !== 'one2many' && ttype !== 'many2many' )}>
                            <Field name="related_model_id" invisible={({ ttype }) => (ttype !== 'many2one' && ttype !== 'one2many' && ttype !== 'many2many')} />
                            <Field name="related_field" invisible={({ ttype }) => (ttype !== 'one2many')} />
                            <Field name="state" invisible={({ state }) => (state === null)} />
                        </Group>
                        <Group label="Valores de selección" invisible={({ ttype }) => (ttype !== 'selection')}>
                            <Field name="selection_ids">
                                {({ Tree, Field }) => (
                                    <Tree>
                                        <Field name="name" />
                                        <Field name="label" />
                                    </Tree>
                                )}
                            </Field>
                        </Group>
                    </Sheet>
                </Page>
            )}
        </Form>
    );
};

export default Field;
