import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
 import authRoutes from "./api/routes/auth-route.js";
 import universityRoutes from "./api/routes/university-route.js";
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(
    cors({
        origin:["http://localhost:5173"],
    })
    )
    
app.use(express.json());
app.use(cookieParser());

 app.use("/auth",authRoutes);
 app.use("/university", universityRoutes);
// app.use(routerUser);

app.listen(3000, () => console.log("Server berhasil dijalankan."));
