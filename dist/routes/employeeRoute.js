import express from "express";
import { postEmployeeInfoController } from "../controller/employeeController.js";
const router = express.Router();
router.post("/register", postEmployeeInfoController);
export default router;
