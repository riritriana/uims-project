import { pool } from "../../database.js";

/////////////////////// DEPARTEMENT
// Mengambil semua departement
export async function getAllDepartements(req, res, next) {
    try {
        const result = await pool.query("SELECT * FROM departement");
        res.json({
            departements: result.rows,
            message: "Departements retrieved successfully.",
        });
    } catch (error) {
        next(error);
    }
}

// Mengambil departement berdasarkan ID
export async function getDepartementById(req, res, next) {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM departement WHERE id_departement = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Departement not found' });
        }
        res.json({
            departement: result.rows[0],
            message: "Departement retrieved successfully.",
        });
    } catch (error) {
        next(error);
    }
}
// Menambahkan departement baru
export async function addDepartement(req, res, next) {
    try {
        const { id_departement, name_departement,name_dekan } = req.body;
        console.log(req.body);
        const result = await pool.query(
            "INSERT INTO departement (id_departement, name_departement, name_dekan) VALUES ($1, $2, $3) RETURNING *",
            [id_departement, name_departement, name_dekan]
        )
        res.json({
            departement: result.rows[0],
            message: "Departement added successfully.",
        });
    } catch (error) {
        next(error);
    }
}
// Hapus Departement berdasarkan ID
export async function deleteDepartementById(req, res, next) {
    const { id } = req.params;
    console.log(id);
    try {
        const result = await pool.query(
            "DELETE FROM departement WHERE id_departement = $1 RETURNING *",
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Departement not found." });
        }
        res.json({
            departement: result.rows[0],
            message: "Departement deleted successfully.",
        });
    } catch (error) {
        next(error);
    }
}

// Edit Departement by Id
export async function updateDepartementById(req, res, next) {
    const { id } = req.params;
    const { name_departement, name_dekan } = req.body;
    try {
        const result = await pool.query(
            "UPDATE departement SET name_departement = $1, name_dekan = $2 WHERE id_departement = $3 RETURNING *",
            [name_departement, name_dekan, id]
        );
        res.json({
            departement: result.rows[0],
            message: "Departement updated successfully.",
        });
    } catch (error) {
        next(error);
    }
}
// /////////////////////// STUDENTS
// Mendapatkan semua mahasiswa
export async function getAllStudent(req, res, next) {
    try {
        const result = await pool.query("SELECT * FROM student INNER JOIN departement on student.id_departement= departement.id_departement");
        res.json({
            students:result.rows,
            message:"Students retrieved successfully"
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
        // const departementCheck = await pool.query(
        //     "SELECT id_departement FROM departement WHERE id_departement = $1",
        //     [id_departement]
        // );
        // if (departementCheck.rows.length === 0) {
        //     return res.status(400).send("departement not found");
        // }
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

// Update data mahasiswa berdasarkan ID
export async function updateStudentById(req, res, next) {
    try {
        const { id_student } = req.params;
        const { name_student, nim, id_departement } = req.body;

        // // Periksa apakah mahasiswa dengan id yang diberikan ada di database
        // const studentCheck = await pool.query(
        //     "SELECT * FROM student WHERE id_student = $1",
        //     [id_student]
        // );

        // // Jika tidak ditemukan, kirimkan respons error
        // if (studentCheck.rows.length === 0) {
        //     return res.status(400).json({ error: 'Student not found' });
        // }

        // // Memeriksa apakah id_departement yang diberikan valid
        // const departementCheck = await pool.query(
        //     "SELECT id_departement FROM departement WHERE id_departement = $1",
        //     [id_departement]
        // );

        // // Jika id_departement tidak valid, kirimkan respons error
        // if (departementCheck.rows.length === 0) {
        //     return res.status(400).send("Departement not found");
        // }

        // Jika id_departement valid, lakukan update data mahasiswa
        const result = await pool.query(
            "UPDATE student SET name_student = $1, nim = $2, id_departement = $3 WHERE id_student = $4 RETURNING *",
            [name_student, nim, id_departement, id_student]
        );
        // Kirimkan respons dengan data mahasiswa yang telah diupdate
        res.json({
            students: result.rows[0],
            message: "Student updated successfully.",
        });
    } catch (error) {
        next(error);
    }
}

// Hapus data mahasiswa berdasarkan ID
export async function deleteStudentById(req, res, next) {
    try {
        const { id_student } = req.params;

        // // Periksa apakah mahasiswa dengan id yang diberikan ada di database
        // const studentCheck = await pool.query(
        //     "SELECT * FROM student WHERE id_student = $1",
        //     [id_student]
        // );

        // // Jika tidak ditemukan, kirimkan respons error
        // if (studentCheck.rows.length === 0) {
        //     return res.status(400).json({ error: 'Student not found' });
        // }

        // Hapus mahasiswa dari database
        await pool.query("DELETE FROM student WHERE id_student = $1", [id_student]);

        res.json({ message: "Student deleted successfully." });
    } catch (error) {
        next(error);
    }
}
// ///////////////////////////// LECTURER
// add lecturer
export async function addLecturer(req,res,next){
    try {
        const {id_lecturer, name_lecturer,id_departement}= req.body;
        // const departementCheck = await pool.query(
        //     "SELECT id_departement FROM departement WHERE id_departement = $1",
        //     [id_departement]
        // );
        // if (departementCheck.rows.length === 0) {
        //     return res.status(400).send("departement not found");
        // }
          // Periksa apakah nilai id_departement null
        //   if (!id_departement) {
        //     return res.status(400).json({ error: 'ID Departement is required.' });
        // }
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

// getAllLecturer
export async function getAllLecturer(req, res, next) {
    try {
        const result = await pool.query("SELECT * FROM lecturer");
        res.json({
            lecturers:result.rows,
            message:"Lecturer retrieved successfully."
        });
    } catch (error) {
        next(error);
    }
}

// updateLecturerById
export async function updateLecturerById(req, res, next) {
    try {
        const { id } = req.params;
        const { name_lecturer, id_departement } = req.body;

        const departementCheck = await pool.query(
            "SELECT id_departement FROM departement WHERE id_departement = $1",
            [id_departement]
        );
        if (departementCheck.rows.length === 0) {
            return res.status(400).send("departement not found");
        }

        const result = await pool.query(
            "UPDATE lecturer SET name_lecturer = $1, id_departement = $2 WHERE id_lecturer = $3 RETURNING *",
            [name_lecturer, id_departement, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).send("Lecturer not found");
        }

        res.json({
            lecturer: result.rows[0],
            message: "Lecturer updated successfully."
        });
    } catch (error) {
        next(error);
    }
}

// deleteLecturerById
export async function deleteLecturerById(req, res, next) {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "DELETE FROM lecturer WHERE id_lecturer = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).send("Lecturer not found");
        }

        res.json({
            lecturer: result.rows[0],
            message: "Lecturer deleted successfully."
        });
    } catch (error) {
        next(error);
    }
}

// //////////// COURSE
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
// updateCourseById
export async function updateCourseById(req, res, next) {
    try {
        const { id } = req.params;
        const { name_course, id_lecturer } = req.body;

        const lecturerCheck = await pool.query(
            "SELECT id_lecturer FROM lecturer WHERE id_lecturer = $1",
            [id_lecturer]
        );
        if (lecturerCheck.rows.length === 0) {
            return res.status(400).send("Lecturer not found");
        }

        const result = await pool.query(
            "UPDATE course SET name_course = $1, id_lecturer = $2 WHERE id_course = $3 RETURNING *",
            [name_course, id_lecturer, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).send("Course not found");
        }

        res.json({
            course: result.rows[0],
            message: "Course updated successfully."
        });
    } catch (error) {
        next(error);
    }
}

// deleteCourseById
export async function deleteCourseById(req, res, next) {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "DELETE FROM course WHERE id_course = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).send("Course not found");
        }

        res.json({
            course: result.rows[0],
            message: "Course deleted successfully."
        });
    } catch (error) {
        next(error);
    }
}

// getAllCourse
export async function getAllCourse(req, res, next) {
    try {
        const courses = await pool.query("SELECT * FROM course");
        res.json(courses.rows);
    } catch (error) {
        next(error);
    }
}

// ////////////////////////// FEES
// add fees
export async function addFees(req,res, next){
    try {
        const{id_fees, id_student,id_departement,pay_fees }=req.body;
        const studentCheck = await pool.query("SELECT * FROM student WHERE id_student = $1", [id_student]);
        const departementCheck = await pool.query("SELECT * FROM departement WHERE id_departement = $1", [id_departement]);
        if (studentCheck.rows.length === 0) {
            return res.status(400).json({error: 'Student not found'});
        }
        if (departementCheck.rows.length === 0) {
            return res.status(400).json({error: 'Department not found'});
        }
        const result= await pool.query(
            "INSERT INTO fees (id_fees, id_student, id_departement, pay_fees)VALUES ($1, $2, $3, $4) RETURNING *", 
            [id_fees, id_student, id_departement, pay_fees]
        );
           res.json({
            fees:result.rows[0],
            message: "Fees added successfully."
 
           }) 
    } catch (error) {
        next(error);
    }
}
// getAllFees
export async function getAllFees(req, res, next) {
    try {
        const fees = await pool.query("SELECT * FROM fees");
        res.json(fees.rows);
    } catch (error) {
        next(error);
    }
}

// updateFeesById
export async function updateFeesById(req, res, next) {
    try {
        const { id } = req.params;
        const { pay_fees } = req.body;

        const result = await pool.query(
            "UPDATE fees SET pay_fees = $1 WHERE id_fees = $2 RETURNING *",
            [pay_fees, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).send("Fees not found");
        }

        res.json({
            fees: result.rows[0],
            message: "Fees updated successfully."
        });
    } catch (error) {
        next(error);
    }
}

// deleteFeesById
export async function deleteFeesById(req, res, next) {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "DELETE FROM fees WHERE id_fees = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).send("Fees not found");
        }

        res.json({
            fees: result.rows[0],
            message: "Fees deleted successfully."
        });
    } catch (error) {
        next(error);
    }
}

// ////////////////////////////
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
