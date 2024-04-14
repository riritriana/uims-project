import express from "express";
import { verifyToken } from "../middleware/middleware.js";
import { addCourse, addDepartement, addFees, addLecturer, addStudent, deleteDepartementById, getAllDepartements, getDepartementById, updateDepartement, updateDepartementById } from "../controllers/university-controllers.js";
const router = express.Router();

router.get("/getAllDepartement",verifyToken, getAllDepartements);
router.get("/getDepartementById/:id",verifyToken, getDepartementById);
router.post("/addDepartement",verifyToken, addDepartement); 
router.put("/updateDepartement",verifyToken, updateDepartement);
router.put("/updateDepartementById/:id",verifyToken, updateDepartementById);
router.delete("/deleteDepartementById/:id", verifyToken, deleteDepartementById);
router.post("/addStudent",verifyToken, addStudent); 
router.post("/addLecturer",verifyToken, addLecturer); 
router.post("/addCourse",verifyToken, addCourse); 
router.post("/addFees",verifyToken, addFees); 

router.get("/me",verifyToken,(req,res)=>{
    // console.log("bebbbbbbas");
    // console.log(req.user)
    try {
    
        res.json(req.user);
    } catch (error) {
        res.status(404);
        res.send("belum login");
    }

}); 

export default router;