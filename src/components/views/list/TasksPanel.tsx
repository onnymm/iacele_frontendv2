import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import Sizeable from "../../common/Sizeable";
import Task from "./Task";
import TaskItem from "./TaskItem";

const TasksPanel = <K extends IACele.API.Database.TableName>({
    table,
    tasks,
    reload,
}: IACele.View.List.TaskPanel<K>) => {

    return (
        <Sizeable>
            {({ view }) => (
                view === 'desktop'
                    ? tasks.map(
                        (task, i) => (
                            <Task<K> key={i} confirm={task.confirm} notify={task.notify} execute={task.execute} name={task.name} table={table} color={task.color} reload={reload} />
                        )
                    )
                    : tasks.length > 0 && (
                        <Dropdown>
                            <DropdownTrigger>
                                <Button size="md" color="primary">Tareas</Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                {
                                    tasks.map(
                                        (task) => (
                                            <DropdownItem textValue={task.name} key={task.execute} color={task.color}>
                                                <TaskItem task={task} table={table} reload={reload} />
                                            </DropdownItem>
                                        )
                                    )
                                }
                            </DropdownMenu>
                        </Dropdown>
                    )
            )}
        </Sizeable>
    );
};

export default TasksPanel;
