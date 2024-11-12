import { postEmployeeInfoService } from "../service/employeeService.js";
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
            resume: req.files?.resume,
            experienceLetter: req.files?.experienceLetter,
            relievingLetter: req.files?.relievingLetter,
        };
        //console.log("2",files);
        // Call the service function
        const result = await postEmployeeInfoService(employeeData, res, files);
        //console.log("3", result);
        // Respond with the result
        res.status(201).json({
            message: "Employee information posted successfully",
            data: result,
        });
    }
    catch (error) {
        console.error("Error in postEmployeeInfoController:", error);
        res.status(500).json({
            message: "Failed to post employee information",
            error: error.message,
        });
    }
};
