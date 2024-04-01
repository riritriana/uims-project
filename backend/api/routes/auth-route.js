import express from "express";
import { register,login } from "../controllers/auth-controllers.js";
import { verifyToken } from "../middleware/middleware.js";
const router = express.Router();

router.post("/register", register); // Daftar akun
router.post("/login", login); // Login akun

export default router;