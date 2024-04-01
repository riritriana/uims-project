import {pool} from "../../database.js";

// add departement 
export async function addDepartement(req,res,next){
    try {
    const result = await pool.query(
        "INSERT INTO departement VALUES ($1, $2) RETURNING *", 
        [req.body.id_departement, req.body.name_departement]
    );
    res.json({
        departement: result.rows[0],
        message: "departement added successfully.",
    })
        
    } catch (error) {
        next(error)
    }
}