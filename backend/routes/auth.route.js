import express from "express";
import {
  getCurrentUser,
  login,
  logout,
  signup,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { signUpValidator } from "../validators/sign-up-validator.js";
import { signInValidator } from "../validators/sign-in-validator.js";

const router = express.Router();

router.post("/signup", signUpValidator, signup);
router.post("/login", signInValidator, login);
router.post("/logout", logout);

router.get("/me", protectRoute, getCurrentUser);

export default router;
