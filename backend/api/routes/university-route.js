import express from "express";
import { verifyToken } from "../middleware/middleware.js";
import { 
    addCourse, 
    addDepartement, 
    addFees, 
    addLecturer, 
    addStudent, 
    deleteCourseById, 
    deleteDepartementById, 
    deleteFeesById, 
    deleteLecturerById, 
    deleteStudentById, 
    getAllDepartements, 
    getAllLecturer, 
    getAllStudent, 
    getDepartementById, 
    updateCourseById, 

    updateDepartementById, 
    updateFeesById, 
    updateLecturerById, 
    updateStudentById } from "../controllers/university-controllers.js";
const router = express.Router();

router.get("/getAllDepartement",verifyToken, getAllDepartements);
router.get("/getDepartementById/:id",verifyToken, getDepartementById);
router.post("/addDepartement",verifyToken, addDepartement); 
// router.put("/updateDepartement",verifyToken, updateDepartement);
router.put("/updateDepartementById/:id",verifyToken, updateDepartementById);
router.delete("/deleteDepartementById/:id", verifyToken, deleteDepartementById);

router.get("/getAllStudent",verifyToken, getAllStudent); 
router.post("/addStudent",verifyToken, addStudent);
router.put("/updateStudentById/:id",verifyToken,updateStudentById);
router.delete("/deleteStudentById/:id",verifyToken,deleteStudentById);

router.post("/addLecturer",verifyToken, addLecturer); 
router.put("/updateLectuerById/:id",verifyToken, updateLecturerById);
router.get("/getAllLecturer", verifyToken,getAllLecturer);
router.delete("/deleteLecturerById/:id", verifyToken, deleteLecturerById);

router.post("/addCourse",verifyToken, addCourse);
router.put("/updateCourseById",verifyToken,updateCourseById);
router.get("/getAllCourse", verifyToken, getAllLecturer);
router.delete("/deleteCourseById", verifyToken, deleteCourseById); 

router.post("/addFees",verifyToken,addFees); 
router.put("/updateFeesById", verifyToken,updateFeesById);
router.delete("/deleteFeesById", verifyToken, deleteFeesById);
router.get("/")
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