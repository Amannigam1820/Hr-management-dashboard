import {
  createHrService,
  deleteHrService,
  getAllHrService,
  getSingleHrService,
  updateHrService,
  hrLoginService,
  hrLogoutService,
} from "../service/hrService.js";
import { HrType } from "../types/hrType.js";

export const createHrController = async (req: any, res: any) => {
  try {
    const hrData: HrType = req.body;

    await createHrService(hrData, res);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const hrLoginController = async (req: any, res: any, next: any) => {
  const { email, password } = req.body;
  try {
    await hrLoginService(email, password, res);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const hrLogoutController = async (req: any, res: any) => {
  try {
    await hrLogoutService(req, res);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const getAllHrController = async (req: any, res: any) => {
  try {
    await getAllHrService(res);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message }); 
  }
};

export const getSingleHrController = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    //console.log(id);

    await getSingleHrService(res, id);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const deleteHrController = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    await deleteHrService(res, id);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const updateHrController = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    await updateHrService(res, updatedData, id);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
