import jwt from "jsonwebtoken";
import "dotenv/config";

export const verifyToken = (req, res, next)=>{
    const token = req.cookies.token;
    // console.log(token);
    if (!token) {
        return res.status(401).send("invalid");
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        // console.log(decoded);
        next();
    } catch (error) {
        res.status(403).send("Invalid token");
    }
}
