import express from "express";
import { Register, Login } from "../controller/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);

router.get("/profile", protect, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

router.post("/logout", (req, res) => {
  res
    .clearCookie("token")
    .json({ success: true, message: "Logged out successfully" });
});

export default router;