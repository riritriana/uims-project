import { pool } from "../../database.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

// ngambil hash password admin
const a = async()=>{
    const hash = await argon2.hash("2004");
    console.log(hash);
}
a();
// register
export async function register(req, res, next) {
    try {
        const hash = await argon2.hash(req.body.password);
        console.log(hash);
        const result = await pool.query(
            "INSERT INTO users (email,password) VALUES ($1, $2) RETURNING *",
            [req.body.email ,hash]
        );
        return res.status(200).json({
            message: "Berhasil menambahkan data",
            data: {
                email: req.body.email
            }
        });        
    } catch (error) {
        next(error);
    }
}
// login
export async function login(req, res, next) {
    const { email, password } = req.body;
    try {
        // Cek apakah pengguna ada di tabel user
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        // console.log(user);
        if (user.rows.length > 0) {
            const passwordMatch = await argon2.verify(user.rows[0].password, password);
            console.log(passwordMatch);
            if (passwordMatch) {
                const token = jwt.sign({ email, role: "user" }, process.env.JWT_SECRET);
                res.cookie('token', token, { httpOnly: true });
                return res.status(200).send({ token, role: "user" });
            }
        }
        // Jika pengguna tidak ada di tabel user, cek apakah mereka ada di tabel admin
        const admin = await pool.query('SELECT * FROM myadmin WHERE email = $1', [email]);
        if (admin.rows.length > 0) {
            const passwordMatch = await argon2.verify(admin.rows[0].password, password);
            if (passwordMatch) {
                const token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET);
                res.cookie('token', token, { httpOnly: true });
                return res.status(200).send({ token, role: "admin" });
            }
        }
        // Jika tidak ada pengguna atau admin dengan email yang cocok atau kata sandi tidak cocok
        res.status(401).send("Login failed");
    } catch (error) {
        console.error("Error logging in user:", error);
        return next(error);
    }
}
