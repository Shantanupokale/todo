import express from "express";
import {
  getAllTodo,
  getTodo,
  updateTodo,
  deleteTodo,
  addTodo,
} from "../controllers/todologic.js";
import { VerifyToken } from "../utils/verify.js";

const router = express.Router();

router.get("/", VerifyToken, getAllTodo);

router.post("/", VerifyToken, addTodo);

router.put("/:id", VerifyToken, updateTodo);

router.get("/:id", VerifyToken, getTodo);

router.delete("/:id", VerifyToken, deleteTodo);

export default router;
