import Tree from "../../../components/view/tree/Tree";

const CarpentryProyectTree = () => {

    return (
        <Tree modelName="carpentry.project" open="/view/form/project">
            {({ Fields, Field }) => (
                <Fields>
                    <Field name="name" />
                    <Field name="user_id" />
                    <Field name="done_activities" />
                    <Field name="remaining_activities" />
                    <Field name="total_time" />
                    <Field name="remaining_time" />
                </Fields>
            )}
        </Tree>
    )
};

export default CarpentryProyectTree;
