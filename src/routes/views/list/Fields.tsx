import Tree from "../../../components/view/tree/Tree";

const Fields = () => {

    return (
        <Tree modelName="base.model.field" open="/view/form/field">
            {({ Fields, Field }) => (
                <Fields>
                    <Field name="name" />
                    <Field name="label" />
                    <Field name="model_id" />
                    <Field name="ttype" />
                    <Field name="is_required" />
                    <Field name="nullable" />
                    <Field name="readonly" />
                    <Field name="unique" />
                    <Field name="related_field" />
                </Fields>
            )}
        </Tree>
    );
};

export default Fields;
