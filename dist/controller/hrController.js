import { createHrService, deleteHrService, getAllHrService, getSingleHrService, updateHrService, hrLoginService, hrLogoutService, } from "../service/hrService.js";
export const createHrController = async (req, res) => {
    try {
        const hrData = req.body;
        await createHrService(hrData, res);
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Internal Server Error", error: error.message });
    }
};
export const hrLoginController = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        await hrLoginService(email, password, res);
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Internal Server Error", error: error.message });
    }
};
export const hrLogoutController = async (req, res) => {
    try {
        await hrLogoutService(req, res);
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Internal Server Error", error: error.message });
    }
};
export const getAllHrController = async (req, res) => {
    try {
        await getAllHrService(res);
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Internal Server Error", error: error.message });
    }
};
export const getSingleHrController = async (req, res) => {
    try {
        const { id } = req.params;
        //console.log(id);
        await getSingleHrService(res, id);
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Internal Server Error", error: error.message });
    }
};
export const deleteHrController = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteHrService(res, id);
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Internal Server Error", error: error.message });
    }
};
export const updateHrController = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        await updateHrService(res, updatedData, id);
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Internal Server Error", error: error.message });
    }
};
