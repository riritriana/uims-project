import express from "express";
import { verifyToken } from "../middleware/middleware.js";
import { addDepartement } from "../controllers/university-controllers.js";
const router = express.Router();

router.post("/addDepartement",verifyToken, addDepartement); // Daftar akun

export default router;