import { Hr } from "../models/hrModel.js";

import { HrType } from "../types/hrType.js";
import { sentToken } from "../utils/jwtToken.js";

export const createHrService = async (hrData: HrType, res: any) => {
  const { username, email, password, fullName, age } = hrData;

  const existingHr = await Hr.findOne({ email });
  if (existingHr) {
    // Send a response indicating that the user already exists
    return res
      .status(409)
      .json({ message: "Hr already exists with this email" });
  }

  //const hashedPassword = await hashPassword(password);

  const hr = await Hr.create({
    fullName,
    username,
    email,
    password,
    age,
  });

  return res.status(201).json({ message: "Hr Register Successfully", hr });
  //sentToken(user, 200, res, "User Registred successfully");
};

export const hrLoginService = async (
  email: string,
  password: string,
  res: any
) => {
  const hr = await Hr.findOne({ email: email }).select("+password");
  //console.log(user);

  if (!hr) {
    return res.status(402).json({ message: "Invalid email or password" });
  }
  //console.log(email, password);

  const checkPassword = await hr.isPasswordCorrects(password);

  //console.log("Password match result:", checkPassword);
  if (!checkPassword) {
    return res.status(402).json({ message: "Invalid email or password 1" });
  }
  sentToken(hr, 200, res, "Hr Login successfully");
};

export const hrLogoutService = async (req: any, res: any) => {
  try {
    res.clearCookie("token");

    return res.status(200).json({ message: "Hr logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return res
      .status(500)
      .json({ message: "Server error, please try again later." });
  }
};

export const getAllHrService = async (res: any) => {
  const hrs = await Hr.find();
  if (!hrs) {
    return res.status(409).json({ message: "No hr listed yet " });
  }
  return res.status(200).json({ message: "All Hr", hrs });
};

export const getSingleHrService = async (res: any, id: string) => {
  //console.log(id);

  const hr = await Hr.findById(id);
  //console.log(hr);

  if (!hr) {
    return res.status(409).json({ message: `No hr found for this ${id}` });
  }
  return res.status(200).json({ message: `Welcome, ${hr.fullName}`, hr });
};

export const deleteHrService = async (res: any, id: string) => {
  const hr = await Hr.findById(id);
  if (!hr) {
    return res.status(409).json({ message: `No hr found for this ${id}` });
  }
  const result = await Hr.deleteOne({ _id: id });
 // console.log(result);
  if (result.deletedCount === 0) {
    return res
      .status(500)
      .json({ message: `Failed to delete hr with ID: ${id}` });
  }

  return res
    .status(200)
    .json({ message: `Hr with ID: ${id} successfully deleted` });
};

export const updateHrService = async (
  res: any,
  updatedData: any,
  id: string
) => {
  const hr = await Hr.findById(id);
  if (!hr) {
    return res.status(404).json({ message: `No hr found with ID: ${id}` });
  }
  const updatedHr = await Hr.findByIdAndUpdate(id, updatedData, {
    new: true,
    //runValidators: true,
  });

  return res.status(200).json({
    message: `User with ID: ${id} successfully updated`,
    user: updatedHr,
  });
};
