import { createUserService, deleteUserService, getAllUserService, getSingleUserService, updateUserService, userLoginService, userLogoutService, } from "../service/userService.js";
export const createUserController = async (req, res) => {
    try {
        const userData = req.body;
        await createUserService(userData, res);
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Internal Server Error", error: error.message });
    }
};
export const userLoginController = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        await userLoginService(email, password, res);
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Internal Server Error", error: error.message });
    }
};
export const userLogoutController = async (req, res) => {
    try {
        await userLogoutService(req, res);
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Internal Server Error", error: error.message });
    }
};
export const getAllUserController = async (req, res) => {
    try {
        await getAllUserService(res);
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Internal Server Error", error: error.message });
    }
};
export const getSingleUserController = async (req, res) => {
    try {
        const { id } = req.params;
        //console.log(id);
        await getSingleUserService(res, id);
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Internal Server Error", error: error.message });
    }
};
export const deleteUserController = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteUserService(res, id);
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Internal Server Error", error: error.message });
    }
};
export const updateUserController = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        await updateUserService(res, updatedData, id);
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Internal Server Error", error: error.message });
    }
};
