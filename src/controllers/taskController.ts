import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  const { projectId } = req.query;
  
  if (!projectId) {
    res.status(400).json({ message: "Project ID is required." });
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