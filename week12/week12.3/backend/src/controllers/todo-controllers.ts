import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getAllTodo(req: Request, res: Response): Promise<any> {
  try {
    const data = await prisma.todo.findMany({});
    if (data.length === 0) {
      return res.json({
        status: false,
        message: "Error while getting all the todos",
        data: {},
        error: {},
      });
    }
    return res.json({
      status: true,
      message: "Successfully fetched all the todos",
      data: { data },
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
      message: "Error while getting all the todos",
      data: {},
      error: { error },
    });
  }
}

interface todoData {
  title: string;
  status: boolean;
  description?: string;
}

export async function createTodo(req: Request, res: Response): Promise<any> {
  try {
    const data: todoData = req.body;

    if (!data.title || !String(data.status)) {
      return res.json({
        status: false,
        message: "Something went wrong while creating todo.",
        data: {},
        error: {},
      });
    }

    const makeDesc =
      req.body.description === ""
        ? "default description"
        : req.body.description;

    const todo = await prisma.todo.create({
      data: {
        title: req.body.title,
        status: req.body.status,
        description: makeDesc,
      },
      select: {
        id: true,
        title: true,
        status: true,
        description: true,
      },
    });
    return res.json({
      status: true,
      message: "Successfully created new todo.",
      data: { todo },
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
      message: "Error while creating new todo",
      data: {},
      error: { error },
    });
  }
}

export async function deleteTodo(req: Request, res: Response): Promise<any> {
  try {
    const { id } = req.body;
    if (!id) {
      return res.json({
        status: false,
        message: "Error while deleting the todo",
        data: {},
        error: {},
      });
    }

    const findTodo = await prisma.todo.findFirst({
      where: {
        id: id,
      },
    });

    if (findTodo === null) {
      return res.json({
        status: false,
        message: "ID is invalid",
        data: {},
        error: {},
      });
    }

    const todo = await prisma.todo.delete({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: true,
        status: true,
        description: true,
      },
    });
    return res.json({
      status: true,
      message: "Successfully deleted todo",
      data: { todo },
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
      message: "Error while deleting the todo",
      data: {},
      error: { error },
    });
  }
}

export async function changeStatus(req: Request, res: Response): Promise<any> {
  try {
    const { id, status } = req.body;
    if (!id) {
      return res.json({
        status: false,
        message: "Error while updating the status",
        data: {},
        error: {},
      });
    }

    const todo = await prisma.todo.update({
      where: { id: id },
      data: {
        status: !status,
      },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
      },
    });
    return res.json({
      status: true,
      message: "Successfully updated the status",
      data: {},
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
      message: "Error while updating the status",
      data: {},
      error: { error },
    });
  }
}
