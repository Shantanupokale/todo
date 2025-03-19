import jwt from "jsonwebtoken";
import createError from "http-errors";

// Verify token in middleware in api routes
export const VerifyToken = (req, res, next) => { 
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json("Access denied");
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).json("Invalid token");
    }
}