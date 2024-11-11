import { User } from "../models/hrModel.js";
import { sentToken } from "../utils/jwtToken.js";
export const createUserService = async (userData, res) => {
    const { username, email, password, fullName, age } = userData;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        // Send a response indicating that the user already exists
        return res
            .status(409)
            .json({ message: "User already exists with this email" });
    }
    //const hashedPassword = await hashPassword(password);
    const user = await User.create({
        fullName,
        username,
        email,
        password,
        age,
    });
    return res.status(201).json({ message: "User created successfully", user });
    //sentToken(user, 200, res, "User Registred successfully");
};
export const userLoginService = async (email, password, res) => {
    const user = await User.findOne({ email: email }).select("+password");
    //console.log(user);
    if (!user) {
        return res.status(402).json({ message: "Invalid email or password" });
    }
    //console.log(email, password);
    const checkPassword = await user.isPasswordCorrects(password);
    //console.log("Password match result:", checkPassword);
    if (!checkPassword) {
        return res.status(402).json({ message: "Invalid email or password 1" });
    }
    sentToken(user, 200, res, "User Login successfully");
};
export const userLogoutService = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "User logged out successfully" });
    }
    catch (error) {
        console.error("Logout error:", error);
        return res
            .status(500)
            .json({ message: "Server error, please try again later." });
    }
};
export const getAllUserService = async (res) => {
    const users = await User.find();
    if (!users) {
        return res.status(409).json({ message: "No user listed yet " });
    }
    return res.status(200).json({ message: "All Users", users });
};
export const getSingleUserService = async (res, id) => {
    //console.log(id);
    const user = await User.findById(id);
    console.log(user);
    if (!user) {
        return res.status(409).json({ message: `No user found for this ${id}` });
    }
    return res.status(200).json({ message: `Welcome, ${user.fullName}`, user });
};
export const deleteUserService = async (res, id) => {
    const user = await User.findById(id);
    if (!user) {
        return res.status(409).json({ message: `No user found for this ${id}` });
    }
    const result = await User.deleteOne({ _id: id });
    console.log(result);
    if (result.deletedCount === 0) {
        return res
            .status(500)
            .json({ message: `Failed to delete user with ID: ${id}` });
    }
    return res
        .status(200)
        .json({ message: `User with ID: ${id} successfully deleted` });
};
export const updateUserService = async (res, updatedData, id) => {
    const user = await User.findById(id);
    if (!user) {
        return res.status(404).json({ message: `No user found with ID: ${id}` });
    }
    const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
        new: true,
        //runValidators: true,
    });
    return res.status(200).json({
        message: `User with ID: ${id} successfully updated`,
        user: updatedUser,
    });
};
