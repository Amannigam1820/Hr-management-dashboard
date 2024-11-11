import jwt from "jsonwebtoken";
import { Hr } from "../models/hrModel.js";
export const isAuthorized = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ message: "User Not Authorized, first need to login........" });
    }
    try {
        const decoded = jwt.verify(token, "amanplaybook");
        if (typeof decoded === "object" && "_id" in decoded) {
            const user = await Hr.findById(decoded._id).select("-password");
            req.user = user;
            next();
        }
        else {
            return res.status(401).json({ message: "Invalid token payload" });
        }
    }
    catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
