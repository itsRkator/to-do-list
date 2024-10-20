import { Request, Response } from "express";
import Task from "../models/Task";
import { CreateTaskBody, TaskQuery, UpdateTaskBody } from "../utils/types";

interface BasicResponseObject {
  message: string;
}

const getTasks = async (
  req: Request<{}, {}, {}, TaskQuery>,
  res: Response
): Promise<any> => {
  const {
    search = "",
    status,
    // page = "1", limit = "10"
  } = req.query;
  try {
    // const pageNumber = Number(page) || 1;
    // const limitNumber = Number(limit) || 10;

    const searchQuery: any = {
      title: { $regex: search, $options: "i" },
    };

    if (status === "completed") {
      searchQuery.completed = true;
    } else if (status === "incomplete") {
      searchQuery.completed = false;
    }

    const tasks = await Task.find(searchQuery);
    // .limit(limitNumber)
    // .skip((pageNumber - 1) * limitNumber);

    // const taskCount = await Task.countDocuments(searchQuery);

    return res.json({
      tasks,
      // currentPage: pageNumber,
      // totalPages: Math.ceil(taskCount / limitNumber),
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

const createTask = async (
  req: Request<{}, {}, CreateTaskBody>,
  res: Response
): Promise<any> => {
  try {
    const { title } = req.body;

    if (!title?.trim()) {
      return res.status(401).json({ message: "Title is required" });
    }

    const newTask = new Task({ title });
    const task = await newTask.save();

    return res.status(201).json(task);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

const updateTask = async (
  req: Request<{ id: string }, {}, UpdateTaskBody>,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  const { completed } = req.body;
  try {
    const task = await Task.findOneAndUpdate(
      { _id: id },
      { completed },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.json(task);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteTask = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  try {
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export { getTasks, createTask, updateTask, deleteTask };
