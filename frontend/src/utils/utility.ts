import { Task } from "../types/Types";

const sortTasks = (tasks: Task[]): Task[] => {
  return [...tasks].sort((taskA: Task, taskB: Task) => {
    if (!taskA.completed && taskB.completed) {
      return 1;
    } else if (taskA.completed && !taskB.completed) {
      return -1;
    } else {
      return 0;
    }
  });
};

export { sortTasks };
