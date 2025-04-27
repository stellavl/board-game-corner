import express from "express";
import { createAdminController } from "../controllers/admin-controller.js";

const router = express.Router();

router.post("/admins", createAdminController);

export default router;