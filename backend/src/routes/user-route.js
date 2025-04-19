import express from "express";
import { getUserByIdController } from "../controllers/user-contoller.js";

const router = express.Router();

router.get("/users/:id", getUserByIdController);

export default router;