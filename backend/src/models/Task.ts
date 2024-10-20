import { Schema, model } from "mongoose";
import { TaskItem } from "../utils/types";

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Task = model<TaskItem>("Task", taskSchema);

export default Task;
