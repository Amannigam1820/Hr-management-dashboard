import { Employee } from "../models/employee.js";
import { uploadToCloudinary } from "../utils/fileUpload.js";
import mongoose from "mongoose";
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
export const postEmployeeInfoService = async (data, res, files) => {
    // console.log("12",data.birth_date);
    try {
        const parsedBirthDate = data.birth_date
            ? new Date(data.birth_date.split("/").reverse().join("-"))
            : undefined;
        const employeeData = {
            name: data.name,
            contact_number: data.contact_number,
            email: data.email,
            tech_stack: data.tech_stack,
            date_of_joining: new Date(new Date(data.date_of_joining).toISOString().split("T")[0]),
            position: data.position,
            year_of_exp: data.year_of_exp || 0,
            cl: data.cl || 0,
            el: data.el || 0,
            salary: data.salary || 0,
            performance: data.performance,
            birth_date: parsedBirthDate,
            address: data.address,
        };
        if (files.resume && files.resume.size > 0) {
            employeeData.resume = await uploadToCloudinary(files.resume, "employee_documents");
        }
        if (files.experienceLetter && files.experienceLetter.size > 0) {
            employeeData.experience_letter = await uploadToCloudinary(files.experienceLetter, "employee_documents");
        }
        if (files.relievingLetter && files.relievingLetter.size > 0) {
            employeeData.reliving_letter = await uploadToCloudinary(files.relievingLetter, "employee_documents");
        }
        //console.log("18", employeeData);
        const newEmployee = await Employee.create(employeeData);
        return res.status(201).json({
            message: "Employee Registered Successfully.",
            data: newEmployee,
        });
    }
    catch (error) {
        console.error("Error uploading files or processing employee info:", error);
        throw new Error("Failed to process employee information.");
    }
};
export const getAllEmployeeInfoService = async (res) => {
    try {
        const employees = await Employee.find();
        if (!employees) {
            return res.status(404).json({
                message: "NO Employee Registered Yet!",
            });
        }
        return res.status(200).json({
            message: "All Employeee.",
            data: employees,
        });
    }
    catch (error) {
        console.error("Fetching all Employee error:", error);
        return res
            .status(500)
            .json({ message: "Server error, please try again later." });
    }
};
export const getEmployeeInfoByIdService = async (employeeId, res) => {
    if (!mongoose.Types.ObjectId.isValid(employeeId)) {
        return res.status(400).json({
            message: "Invalid ID format. Please provide a valid ObjectId.",
        });
    }
    const employee = await Employee.findById(employeeId);
    if (!employee) {
        return res.status(401).json({
            message: `No Employee find from this ${employeeId}`,
        });
    }
    return res.status(402).json({
        message: "Employee Details",
        data: employee,
    });
};
export const deleteEmployeeService = async (employeeId, res) => {
    //console.log(employeeId);
    if (!mongoose.Types.ObjectId.isValid(employeeId)) {
        return res.status(400).json({
            message: "Invalid ID format. Please provide a valid ObjectId.",
        });
    }
    const employee = await Employee.findById(employeeId);
    if (!employee) {
        return res.status(401).json({
            message: `NO Employee found from this ${employeeId}`,
        });
    }
    const result = await Employee.deleteOne({ _id: employeeId });
    if (result.deletedCount === 0) {
        return res
            .status(500)
            .json({ message: `Failed to delete hr with ID: ${employeeId}` });
    }
    return res
        .status(200)
        .json({ message: `Hr with ID: ${employeeId} successfully deleted` });
};
export const updateEmployeeInfoService = async (employeeId, res, updatedData) => {
    if (!mongoose.Types.ObjectId.isValid(employeeId)) {
        return res.status(400).json({
            message: "Invalid ID format. Please provide a valid ObjectId.",
        });
    }
    const hr = await Employee.findById(employeeId);
    if (!hr) {
        return res.status(404).json({ message: `No Employee found with ID: ${employeeId}` });
    }
    const updatedEmployee = await Employee.findByIdAndUpdate(employeeId, updatedData, {
        new: true,
        //runValidators: true,
    });
    return res.status(200).json({
        message: `User with ID: ${employeeId} successfully updated`,
        user: updatedEmployee,
    });
};
