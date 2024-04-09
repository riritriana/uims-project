import express from "express";
import { verifyToken } from "../middleware/middleware.js";
import { addDepartement, addStudent } from "../controllers/university-controllers.js";
const router = express.Router();

router.post("/addDepartement",verifyToken, addDepartement); 
router.post("/addStudent",verifyToken, addStudent); 
router.get("/me",verifyToken,(req,res)=>{
    console.log("bebbbbbbas");
    console.log(req.user)
    try {
    
        res.json(req.user);
    } catch (error) {
        res.status(404);
        res.send("belum login");
    }

}); 

export default router;