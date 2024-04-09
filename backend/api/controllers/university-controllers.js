import { pool } from "../../database.js";

// Menambahkan departement baru
export async function addDepartement(req, res, next) {
    try {
        const { id_departement, name_departement } = req.body;
        const result = await pool.query(
            "INSERT INTO departement (id_departement, name_departement) VALUES ($1, $2) RETURNING *",
            [id_departement, name_departement]
        );
        res.json({
            departement: result.rows[0],
            message: "Departement added successfully.",
        });
    } catch (error) {
        next(error);
    }
}
// Menambahkan mahasiswa baru
export async function addStudent(req, res, next) {
    try {
        const { id_student, name_student, nim, id_departement } = req.body;
        // Memeriksa apakah id_departement yang diberikan valid
        const departementCheck = await pool.query(
            "SELECT id_departement FROM departement WHERE id_departement = $1",
            [id_departement]
        );
        if (departementCheck.rows.length === 0) {
            return res.status(400).send("departement not found");
        }
        // Jika id_departement valid, tambahkan mahasiswa ke dalam tabel student
        const result = await pool.query(
            "INSERT INTO student (id_student, name_student, nim, id_departement) VALUES ($1, $2, $3, $4) RETURNING *",
            [id_student, name_student, nim, id_departement]
        );
        res.json({
            student: result.rows[0],
            message: "Student added successfully."
        });
    } catch (error) {
        next(error);
    }
}
// add lecturer
export async function addDosen(req,res,next){
    try {
        const {id_lecturer, name_lecturer,id_departement}= req.body;
        const departementCheck = await pool.query(
            "SELECT id_departement FROM departement WHERE id_departement = $1",
            [id_departement]
        );
        if (departementCheck.rows.length === 0) {
            return res.status(400).send("departement not found");
        }
        const result = await pool.query(
            "INSERT INTO lecturer (id_lecturer,name_lecturer,id_departement) VALUES ($1, $2, $3) RETURNING *",
            [id_lecturer, name_lecturer,id_departement]
        );
        res.json({
            lecturer: result.rows[0],
            message: "Lecturer added successfully."

        });
    } catch (error) {
        next(error);
    }
}
// add course
export async function addCourse(req,res,next){
    try {
        const {id_course,name_course, id_lecturer }= req.body;
        const lecturerCheck =await pool.query(
            "SELECT id_lecturer FROM lecturer WHERE id_lecturer =$1",
            [id_lecturer]
        );
        if(lecturerCheck.rows.length===0){
            res.status(400).send("lecturer not found");
        }
        const result = await pool.query(
            "INSERT INTO course (id_course,name_course, id_lecturer) VALUES ($1, $2, $3) RETURNING *",
            [id_course,name_course, id_lecturer]
        );
        res.json({
           course:result.rows[0],
           message: "Course added successfully."
        });
    } catch (error) {
        next(error);
    }
}
// add learning
export async function addLearning(req,res,next){
    try {
        const{id_learning,name_class,id_student,id_departement,id_lecturer, id_course  }=req.body;       
        // Check if the student, department, lecturer, and course exist before insertion
        const studentCheck = await pool.query("SELECT * FROM student WHERE id_student = $1", [id_student]);
        const departementCheck = await pool.query("SELECT * FROM departement WHERE id_departement = $1", [id_departement]);
        const lecturerCheck = await pool.query("SELECT * FROM lecturer WHERE id_lecturer = $1", [id_lecturer]);
        const courseCheck = await pool.query("SELECT * FROM course WHERE id_course = $1", [id_course])
        // Ensure all required data exists before insertion
        if (studentCheck.rows.length === 0) {
            return res.status(400).json({error: 'Student not found'});
        }
        if (departementCheck.rows.length === 0) {
            return res.status(400).json({error: 'Department not found'});
        }
        if (lecturerCheck.rows.length === 0) {
            return res.status(400).json({error: 'Lecturer not found'});
        }
        if (courseCheck.rows.length === 0) {
            return res.status(400).json({error: 'Course not found'});
        }
        // Insert data into learning table
        const result = await pool.query(
            "INSERT INTO learning (id_learning, name_class, id_student, id_departement, id_lecturer, id_course) VALUES ($1, $2, $3, $4, $5, $6)",
            [id_learning, name_class, id_student, id_departement, id_lecturer, id_course]
        );
        res.json({
            learning:result.rows[0],
            message: 'Learning record added successfully'});
    } catch (error) {
        next(error);
    }
}
