import { Task } from "../types/Types";

const sortTasks = (tasks: Task[]): Task[] => {
  return [...tasks].sort((taskA: Task, taskB: Task) => {
    if (!taskA.completed && taskB.completed) {
      return 1; // taskA comes before taskB
    } else if (taskA.completed && !taskB.completed) {
      return -1; // taskB comes before taskA
    } else {
      return 0; // maintain original order for equal tasks
    }
  });
};

export { sortTasks };
