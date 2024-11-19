import { Request, Response } from "express";
import { postEmployeeInfoService } from "../service/employeeService.js";
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
      yearsOfExperience: parseInt(req.body.yearsOfExperience, 10),
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
    const result = await postEmployeeInfoService(employeeData, res, files);

    //console.log("3", result);

    // Respond with the result
    res.status(201).json({
      message: "Employee information posted successfully 12345 ddsdsdd aefmefkmfksdm",
      data: result,
    });
  } catch (error: any) {
    console.error("Error in postEmployeeInfoController:", error);
    res.status(500).json({
      message: "Failed to post employee information",
      error: error.message,
    });
  }
};
