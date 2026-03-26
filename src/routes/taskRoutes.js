import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createTask, getTasks, deleteTask } from "../controllers/taskController.js";

const router = express.Router();

// Apply auth middleware
router.use(authMiddleware);
// Checks were done inside the controllers
router.post("/", createTask);
router.get("/", getTasks);
router.delete("/:id", deleteTask);

export default router;