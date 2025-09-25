import Tree from "../../../components/view/tree/Tree";

const Permissions = () => {

    return (
        <Tree modelName="base.model.access">
            {({ Fields, Field }) => (
                <Fields>
                    <Field name="name" />
                    <Field name="model_id" />
                    <Field name="label" />
                </Fields>
            )}
        </Tree>
    );
};

export default Permissions;
