import useTask from "../../../hooks/views/useTask";

const TaskItem = <K extends IACele.API.Database.TableName>({
    task,
    table,
    reload,
}: IACele.View.List.TaskItem<K>) => {

    const { executeWithConfirmation } = useTask(
        task.execute,
        task.color,
        table,
        task.confirm,
        task.notify,
        reload,
    );

    return (
        <div onClick={executeWithConfirmation} className={`text-${task.color}-500 hover:text-white flex flex-row items-center size-full`}>
            {task.name}
        </div>
    );
};

export default TaskItem;
