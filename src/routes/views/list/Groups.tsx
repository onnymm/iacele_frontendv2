import Tree from "../../../components/view/tree/Tree";

const Groups = () => {

    return (
        <Tree modelName="base.model.access.groups">
            {({ Fields, Field }) => (
                <Fields>
                    <Field name="name" />
                    <Field name="permission_ids" />
                </Fields>
            )}
        </Tree>
    )
};

export default Groups;
