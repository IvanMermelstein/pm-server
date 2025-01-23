import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  const { projectId } = req.query;
  
  if (!projectId) {
    res.status(400).json({ message: "Project Id is required." });
    return;
  }
  
  try {
    const tasks = await prisma.task.findMany({
      where: {
        projectId: parseInt(projectId as string, 10),
      },
      include: {
        author: true,
        assignee: true,
        comments: true,
        attachments: true,
      },
    });
    res.status(200).json(tasks);
  } catch (error: any) {
    res.status(500).json({ message: `Error retrieving tasks: ${error}` });
  }
};

export const createTask = async (req: Request, res: Response): Promise<void> => {
  const { title, description, status, priority, tags, startDate, dueDate, points, projectId, authorUserId, assignedUserId } = req.body;
  
  try {
    const task = await prisma.task.create({
      data: {
        title, 
        description, 
        status, 
        priority, 
        tags, 
        startDate, 
        dueDate, 
        points, 
        projectId, 
        authorUserId,
        assignedUserId 
      },
    });
    res.status(201).json(task);
  } catch (error: any) {
    res.status(500).json({ message: `Error creating task: ${error}` });
  }
}

export const updateTaskStatus = async (req: Request, res: Response): Promise<void> => {
  const { taskId } = req.params;
  const { status } = req.body;
  
  try {
    const task = await prisma.task.update({
      where: {
        id: parseInt(taskId as string, 10),
      },
      data: {
        status,
      },
    });
    res.status(200).json(task);
  } catch (error: any) {
    res.status(500).json({ message: `Error updating task status: ${error.message}` });
  }
}