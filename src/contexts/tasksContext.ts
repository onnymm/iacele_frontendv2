import { createContext } from "react";

const TasksContext = createContext<IACele.Context.Tasks>({
    pushTask: () => null,
});

export default TasksContext;
