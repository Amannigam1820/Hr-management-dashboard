import { Employee } from "../models/employee.js";
import { EmployeeType } from "../types/employeeType.js";
import { uploadToCloudinary } from "../utils/fileUpload.js";
import { v2 as cloudinary } from "cloudinary";
import { UploadedFile } from "express-fileupload";

// export const postEmployeeInfo = async (empData: EmployeeType) => {
//   try {
//     const {
//       name,
//       contact_number,
//       email,
//       tech_stack,
//       resume,
//       date_of_joining,
//       position,
//       year_of_exp,
//       cl,
//       el,
//       salary,
//       performance,
//       birth_date,
//       address,

//       reliving_letter,

//       experience_letter,
//       work_anniversary,
//     } = empData;

export const postEmployeeInfoService = async (
  data: any,
  res: any,
  files: {
    resume?: UploadedFile;
    experienceLetter?: UploadedFile;
    relievingLetter?: UploadedFile;
  }
) => {
  // console.log("12",data.birth_date);

  try {
    const parsedBirthDate = data.birth_date
      ? new Date(data.birth_date.split("/").reverse().join("-"))
      : undefined;

    const employeeData: EmployeeType = {
      name: data.name!,
      contact_number: data.contact_number!,
      email: data.email!,
      tech_stack: data.tech_stack!,
      date_of_joining: new Date(
        new Date(data.date_of_joining).toISOString().split("T")[0]
      ),
      position: data.position!,
      year_of_exp: data.year_of_exp || 0,
      cl: data.cl || 0,
      el: data.el || 0,
      salary: data.salary || 0,
      performance: data.performance!,
      birth_date: parsedBirthDate!,
      address: data.address!,
    };

    if (files.resume && files.resume.size > 0) {
      employeeData.resume = await uploadToCloudinary(
        files.resume,
        "employee_documents"
      );
    }

    if (files.experienceLetter && files.experienceLetter.size > 0) {
      employeeData.experience_letter = await uploadToCloudinary(
        files.experienceLetter,
        "employee_documents"
      );
    }

    if (files.relievingLetter && files.relievingLetter.size > 0) {
      employeeData.reliving_letter = await uploadToCloudinary(
        files.relievingLetter,
        "employee_documents"
      );
    }

    // console.log("18", employeeData);

    const newEmployee = await Employee.create(employeeData);
    return newEmployee;
  } catch (error) {
    console.error("Error uploading files or processing employee info:", error);
    throw new Error("Failed to process employee information.");
  }
};
