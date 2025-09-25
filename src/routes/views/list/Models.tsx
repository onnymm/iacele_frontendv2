import Tree from "../../../components/view/tree/Tree"

const Models = () => {

    return (
        <Tree modelName="base.model" open="/view/form/model">
            {({ Fields, Field }) => (
                <Fields>
                    <Field name="name" />
                    <Field name="label" />
                    <Field name="model" />
                    <Field name="field_ids" />
                </Fields>
            )}
        </Tree>
    );
};

export default Models;
