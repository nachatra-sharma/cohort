import { Router } from "express";
const router = Router();
import {
  getAllTodo,
  createTodo,
  deleteTodo,
  changeStatus,
} from "../../controllers/todo-controllers";

router.get("/todo", getAllTodo);
router.post("/todo", createTodo);
router.delete("/todo", deleteTodo);
router.patch("/todo", changeStatus);

export default router;
