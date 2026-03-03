import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

// I ended up doing the checks in the controller instead of the route.
router.post("/register", register);
router.post("/login", login);

export default router;