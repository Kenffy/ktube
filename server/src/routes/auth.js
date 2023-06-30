import express from "express";
import {
  login,
  register,
  logout,
  google,
  refresh,
} from "../controllers/authController.js";

const router = express.Router();

//CREATE A USER
router.post("/login", login);
router.post("/google", google);
router.post("/refresh", refresh);
router.post("/register", register);
router.post("/logout", logout);

export default router;
