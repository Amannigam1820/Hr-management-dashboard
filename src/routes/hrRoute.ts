import express from "express";
import {
  createHrController,
  deleteHrController,
  getAllHrController,
  getSingleHrController,
  updateHrController,
  hrLoginController,
  hrLogoutController,
} from "../controller/hrController.js";
import { isAuthorized } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", createHrController);
router.get("/all", isAuthorized, getAllHrController);
router.get("/:id", isAuthorized, getSingleHrController);
router.delete("/:id", isAuthorized, deleteHrController);
router.put("/:id", isAuthorized, updateHrController);
router.post("/login", hrLoginController);
router.post("/logout", isAuthorized, hrLogoutController);

export default router;
