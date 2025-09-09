import { Request, Response } from "express";
import Task from "../models/Task";

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, status } = req.body;
    const newTask = await Task.create({ title, description, status });
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: "Failed to create task" });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedTask) return res.status(404).json({ error: "Task not found" });
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: "Failed to update task" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete task" });
  }
};
