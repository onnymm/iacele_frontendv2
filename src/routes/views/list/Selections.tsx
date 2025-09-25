import Tree from "../../../components/view/tree/Tree";

const Selections = () => {

    return (
        <Tree modelName="base.model.field.selection">
            {({ Fields, Field }) => (
                <Fields>
                    <Field name="name" />
                    <Field name="label" />
                    <Field name="field_id" />
                </Fields>
            )}
        </Tree>
    )
};

export default Selections;
