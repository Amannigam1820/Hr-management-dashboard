import { deleteEmployeeService, getAllEmployeeInfoService, getEmployeeInfoByIdService, postEmployeeInfoService, updateEmployeeInfoService, } from "../service/employeeService.js";
export const postEmployeeInfoController = async (req, res) => {
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
            resume: req.files?.resume,
            experienceLetter: req.files?.experienceLetter,
            relievingLetter: req.files?.relievingLetter,
        };
        //console.log("2",files);
        // Call the service function
        await postEmployeeInfoService(employeeData, res, files);
        //console.log("3", result);
    }
    catch (error) {
        console.error("Error in postEmployeeInfoController:", error);
        res.status(500).json({
            message: "Failed to post employee information",
            error: error.message,
        });
    }
};
export const getAllEmployeeInfoController = async (req, res) => {
    try {
        await getAllEmployeeInfoService(res);
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Internal Server Error", error: error.message });
    }
};
export const getEmployeeInfoByIdController = async (req, res) => {
    const employeeId = req.params.id;
    try {
        await getEmployeeInfoByIdService(employeeId, res);
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Internal Server Error", error: error.message });
    }
};
export const deleteEmployeeController = async (req, res) => {
    try {
        const employeeId = req.params.id;
        await deleteEmployeeService(employeeId, res);
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Internal Server Error", error: error.message });
    }
};
export const updateEmployeeController = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const updatedData = req.body;
        await updateEmployeeInfoService(employeeId, res, updatedData);
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Internal Server Error", error: error.message });
    }
};
