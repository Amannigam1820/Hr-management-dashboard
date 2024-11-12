import express from "express";
import { deleteEmployeeController, getAllEmployeeInfoController, getEmployeeInfoByIdController, postEmployeeInfoController, updateEmployeeController, } from "../controller/employeeController.js";
const router = express.Router();
router.post("/register", postEmployeeInfoController);
router.get("/all", getAllEmployeeInfoController);
router.get("/:id", getEmployeeInfoByIdController);
router.delete("/:id", deleteEmployeeController);
router.put("/:id", updateEmployeeController);
export default router;
