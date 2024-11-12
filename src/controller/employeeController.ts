import { Request, Response } from "express";
import {
  deleteEmployeeService,
  getAllEmployeeInfoService,
  getEmployeeInfoByIdService,
  postEmployeeInfoService,
  updateEmployeeInfoService,
} from "../service/employeeService.js";
import { UploadedFile } from "express-fileupload";

export const postEmployeeInfoController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Extract data from req.body
    const employeeData = {
      name: req.body.name,
      contact_number: req.body.contact_number,
      email: req.body.email,
      tech_stack: req.body.tech_stack,
      date_of_joining: req.body.date_of_joining,
      position: req.body.position,
      year_of_exp: req.body.year_of_exp,
      cl: parseInt(req.body.cl, 10),
      el: parseInt(req.body.el, 10),
      salary: parseFloat(req.body.salary),
      performance: req.body.performance,
      birth_date: req.body.birth_date,
      address: req.body.address,
    };

    // Extract files from req.files
    const files = {
      resume: req.files?.resume as UploadedFile,
      experienceLetter: req.files?.experienceLetter as UploadedFile,
      relievingLetter: req.files?.relievingLetter as UploadedFile,
    };

    //console.log("2",files);

    // Call the service function
    await postEmployeeInfoService(employeeData, res, files);

    //console.log("3", result);
  } catch (error: any) {
    console.error("Error in postEmployeeInfoController:", error);
    res.status(500).json({
      message: "Failed to post employee information",
      error: error.message,
    });
  }
};

export const getAllEmployeeInfoController = async (req: any, res: any) => {
  try {
    await getAllEmployeeInfoService(res);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const getEmployeeInfoByIdController = async (req: any, res: any) => {
  const employeeId = req.params.id;

  try {
    await getEmployeeInfoByIdService(employeeId, res);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const deleteEmployeeController = async (req: any, res: any) => {
  try {
    const employeeId = req.params.id;
    await deleteEmployeeService(employeeId, res);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
export const updateEmployeeController = async(req:any,res:any)=>{
  try {
    const employeeId = req.params.id;
    const updatedData = req.body;
    await updateEmployeeInfoService(employeeId,res, updatedData);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}