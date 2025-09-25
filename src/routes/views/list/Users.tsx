import Tree from "../../../components/view/tree/Tree";

const BaseUsersTree = () => {

    return (
        <Tree modelName="base.users" open="/view/form/user">
            {({ Fields, Field }) => (
                <Fields>
                    <Field name="name" decoration={{ warning: ({ active }) => (!active) }} />
                    <Field name="login" label="Usuario" />
                    <Field name="active" />
                    <Field name="sync" />
                    <Field name="birthday_date" />
                </Fields>
            )}
        </Tree>
    )
};

export default BaseUsersTree;
